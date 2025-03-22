import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  FormLabelDirective,
  ButtonDirective,
  FormFeedbackComponent,
  FormCheckComponent,
  FormControlDirective,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormSelectDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-asset-create',
  imports: [
    ReactiveFormsModule,
    ColComponent,
    RowComponent,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ButtonDirective,
    FormCheckComponent,
    FormControlDirective,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    FormSelectDirective,
  ],
  templateUrl: './asset-create.component.html',
  styleUrl: './asset-create.component.scss',
})
export class AssetCreateComponent {
  assetForm!: FormGroup<{
    name: FormControl<string | null>;
    symbol: FormControl<string | null>;
    assetType: FormControl<string | null>;
    exclusive: FormControl<boolean | null>;
    supplyType: FormControl<string | null>;
    supply: FormControl<string | null>;
    pricingModel: FormControl<string | null>;
    tradingModel: FormControl<string | null>;
    executionModel: FormControl<string | null>;
    cid: FormControl<string | null>;
    marketId: FormControl<string | null>;
    level: FormControl<string | null>;
    extra: FormControl<string | null>;
  }>;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  assetTypes = [
    { value: 1, label: 'Type 1' },
    { value: 2, label: 'Type 2' },
  ];

  supplyTypes = [
    { value: 1, label: 'Fixed Supply' },
    { value: 2, label: 'Unlimited Supply' },
  ];

  supply = [
    { value: 1, label: 'Fixed Supply' },
    { value: 2, label: 'Unlimited Supply' },
  ];

  pricingModels = [
    { value: 1, label: 'Model A' },
    { value: 2, label: 'Model B' },
  ];

  levels = [
    { value: 1, label: 'Level 1' },
    { value: 2, label: 'Level 2' },
    { value: 3, label: 'Level 3' },
  ];

  tradingModels = [
    { value: 1, label: 'Model X' },
    { value: 2, label: 'Model Y' },
  ];

  executionModels = [
    { value: 1, label: 'Model P' },
    { value: 2, label: 'Model Q' },
  ];

  marketIds = [
    { value: 1, label: 'Market 1' },
    { value: 2, label: 'Market 2' },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.assetForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      symbol: ['', [Validators.required, Validators.minLength(3)]],
      assetType: ['', [Validators.required]],
      exclusive: [false, [Validators.required]],
      supplyType: ['', [Validators.required]],
      supply: ['', [Validators.required]],
      pricingModel: ['', [Validators.required]],
      tradingModel: ['', [Validators.required]],
      executionModel: ['', [Validators.required]],
      cid: [''],
      marketId: ['', [Validators.required]],
      level: ['', [Validators.required]],
      extra: [''],
    });
  }

  isInvalid(field: string): boolean {
    const control = this.assetForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  onSubmit() {
    if (this.assetForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('/account/create/asset', this.assetForm.value).subscribe({
      next: () => {
        this.successMessage = 'Asset created successfully!';
        this.assetForm.reset();
      },
      error: () => {
        this.errorMessage = 'Failed to create asset. Please try again.';
      },
      complete: () => {
        this.submitting = false;
      },
    });
  }
}
