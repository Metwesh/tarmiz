import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardModule,
  ColComponent,
  FormControlDirective,
  FormLabelDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  RowComponent,
  SpinnerComponent,
} from '@coreui/angular';
import { SYSTEM_ENUMS } from '../../constants/enums';
import { AsyncSelectComponent } from '../async-select/async-select.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-price-add-modal',
  imports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonDirective,
    ButtonCloseDirective,
    ReactiveFormsModule,
    FormControlDirective,
    FormLabelDirective,
    ColComponent,
    RowComponent,
    SpinnerComponent,
    AsyncSelectComponent,
    CardModule,
  ],
  templateUrl: './price-add-modal.component.html',
  styleUrl: './price-add-modal.component.scss',
})
export class PriceAddModalComponent {
  @Input({
    required: true,
  })
  visible!: boolean;
  @Input({
    required: true,
  })
  assetName?: string;

  @Output() close = new EventEmitter<void>();
  @Output() revalidate = new EventEmitter<void>();

  assetId: string | null = null;

  priceAddForm!: FormGroup<{
    marketId: FormControl<string | null>;
    bid: FormControl<number | null>;
    ask: FormControl<number | null>;
  }>;

  submitting = false;

  marketKey = SYSTEM_ENUMS.MARKET;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) this.assetId = id;

    this.priceAddForm = this.formBuilder.group({
      marketId: ['', [Validators.required, Validators.min(0)]],
      bid: [0, [Validators.required, Validators.min(0.00000000001)]],
      ask: [0, [Validators.required, Validators.min(0.00000000001)]],
    });
  }

  onSubmit() {
    if (this.priceAddForm.invalid) return;
    this.submitting = true;
    const apiFormData = {
      time: Date.now(),
      assetId: this.assetId,
      ...this.priceAddForm.value,
    };

    this.http.post('/issuer/asset/update/price', apiFormData).subscribe({
      next: () => {
        this.submitting = false;
        this.closeModal();
        this.revalidateAssetInner();
      },
      error: () => {
        this.submitting = false;
      },
    });
  }

  onReset() {
    this.submitting = false;
    this.priceAddForm.reset();
    this.closeModal();
  }

  onVisibleChange(value: boolean) {
    if (value) return;
    this.onReset();
  }

  private closeModal() {
    this.close.emit();
  }
  private revalidateAssetInner() {
    this.revalidate.emit();
  }
}
