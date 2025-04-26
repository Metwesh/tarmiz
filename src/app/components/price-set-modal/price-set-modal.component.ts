import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ColDirective,
  FormControlDirective,
  FormLabelDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  RowComponent,
  RowDirective,
  SpinnerComponent,
} from '@coreui/angular';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-price-set-modal',
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
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    SpinnerComponent,
  ],
  templateUrl: './price-set-modal.component.html',
  styleUrl: './price-set-modal.component.scss',
})
export class PriceSetModalComponent {
  @Input({
    required: true,
  })
  visible!: boolean;
  @Input({
    required: true,
  })
  formData:
    | {
        assetId: number;
        assetName: string;
        marketId: number;
        marketName: string;
        bid: number;
        ask: number;
      }
    | undefined;
  @Output() close = new EventEmitter<void>();
  @Output() revalidate = new EventEmitter<void>();

  priceSetForm!: FormGroup<{
    bid: FormControl<number | null>;
    ask: FormControl<number | null>;
  }>;

  submitting = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.priceSetForm = this.formBuilder.group({
      bid: [0, [Validators.required, Validators.min(0.00000000001)]],
      ask: [0, [Validators.required, Validators.min(0.00000000001)]],
    });
  }

  onSubmit() {
    if (this.priceSetForm.invalid) return;
    this.submitting = true;

    const apiFormData = {
      assetId: this.formData?.assetId ?? 0,
      marketId: this.formData?.marketId ?? 0,
      time: Date.now(),
      ...this.priceSetForm.value,
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
    this.priceSetForm.reset();
    this.closeModal();
  }

  onVisibleChange(value: boolean) {
    this.priceSetForm.setValue({
      bid: this.formData?.bid ?? 0,
      ask: this.formData?.ask ?? 0,
    });
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
