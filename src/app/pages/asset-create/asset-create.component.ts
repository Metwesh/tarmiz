import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  RowComponent,
  SpinnerComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AsyncSelectComponent } from '../../components/async-select/async-select.component';
import { SYSTEM_ENUMS } from '../../constants/enums';

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
    AsyncSelectComponent,
    SpinnerComponent,
    AlertComponent,
    IconDirective,
  ],
  templateUrl: './asset-create.component.html',
  styleUrl: './asset-create.component.scss',
})
export class AssetCreateComponent implements OnInit {
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

  assetTypeUrl = SYSTEM_ENUMS.ASSET_TYPE;
  pricingModelUrl = SYSTEM_ENUMS.PRICING_MODEL;
  supplyTypesUrl = SYSTEM_ENUMS.SUPPLY_TYPES;
  accountLevelUrl = SYSTEM_ENUMS.ACCOUNT_LEVEL;
  tradingModelUrl = SYSTEM_ENUMS.TRADING_MODEL;
  executionModelUrl = SYSTEM_ENUMS.EXECUTION_MODEL;
  marketUrl = SYSTEM_ENUMS.MARKET;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.assetForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      symbol: ['', [Validators.required, Validators.minLength(3)]],
      assetType: ['', [Validators.required]],
      exclusive: [false, [Validators.required]],
      supplyType: ['', [Validators.required]],
      supply: [''],
      pricingModel: ['', [Validators.required]],
      tradingModel: ['', [Validators.required]],
      executionModel: ['', [Validators.required]],
      cid: [''],
      marketId: ['', [Validators.required]],
      level: ['', [Validators.required]],
      extra: [''],
    });
  }

  ngOnInit() {
    // Watch for changes in supplyType
    this.assetForm.get('supplyType')?.valueChanges.subscribe((value) => {
      const supplyControl = this.assetForm.get('supply');
      if (value === '1') supplyControl?.setValidators([Validators.required]);
      else supplyControl?.clearValidators();

      supplyControl?.updateValueAndValidity();
    });
  }

  isInvalid(field: string): boolean {
    const control = this.assetForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  onSubmit() {
    this.submitting = true;
    if (this.assetForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.submitting = false;
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('/account/create/asset', this.assetForm.value).subscribe({
      next: () => {
        this.successMessage = 'Asset created successfully!';
        this.assetForm.reset();
        this.submitting = false;
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.submitting = false;
      },
    });
  }
}
