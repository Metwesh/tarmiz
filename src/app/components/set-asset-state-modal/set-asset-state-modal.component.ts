import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ButtonCloseDirective,
  ButtonDirective,
  FormControlDirective,
  FormLabelDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  SpinnerComponent,
} from '@coreui/angular';
import { SYSTEM_ENUMS } from '../../constants/enums';
import { AsyncSelectComponent } from '../async-select/async-select.component';

@Component({
  selector: 'app-set-asset-state-modal',
  imports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonDirective,
    ButtonCloseDirective,
    ReactiveFormsModule,
    SpinnerComponent,
    AsyncSelectComponent,
  ],
  templateUrl: './set-asset-state-modal.component.html',
  styleUrl: './set-asset-state-modal.component.scss',
})
export class SetAssetStateModalComponent {
  @Input({
    required: true,
  })
  visible!: boolean;
  @Input({
    required: true,
  })
  assetState: number | undefined;
  @Output() close = new EventEmitter<void>();
  @Output() revalidate = new EventEmitter<void>();

  assetStateForm!: FormGroup<{
    state: FormControl<number | null>;
  }>;

  submitting = false;

  assetStateKey = SYSTEM_ENUMS.ASSET_STATE;

  get assetStateDefaultValue() {
    return `${this.assetState}`;
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.assetStateForm = this.formBuilder.group({
      state: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    const assetId = this.route.snapshot.paramMap.get('id');
    if (this.assetStateForm.invalid || !assetId) return;
    this.submitting = true;

    const apiFormData = {
      assetId: +assetId,
      state: +(this.assetStateForm.value.state ?? 0),
    };

    this.http.post('/assets/update/state', apiFormData).subscribe({
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
    this.assetStateForm.reset();
    this.closeModal();
  }

  onVisibleChange(value: boolean) {
    this.assetStateForm.setValue({
      state: this.assetState ?? 0,
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
