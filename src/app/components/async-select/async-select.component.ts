import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormSelectDirective } from '@coreui/angular';
import { SelectOption } from '../../@types/generic';
import { SYSTEM_ENUMS } from '../../constants/enums';
import { EnumService } from '../../services/enum-service.service';

@Component({
  selector: 'app-async-select',
  imports: [ReactiveFormsModule, FormSelectDirective],
  templateUrl: './async-select.component.html',
  styleUrl: './async-select.component.scss',
})
export class AsyncSelectComponent implements OnInit, OnChanges {
  @Input({
    required: true,
  })
  key!: (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS];
  @Input({
    required: true,
  })
  control!: FormControl;
  @Input({
    required: true,
  })
  controlName!: string;
  @Input({
    required: true,
  })
  label!: string;
  @Input({
    required: true,
  })
  placeholder!: string;
  @Input() defaultValue: string | undefined;
  @Input() excludeValues: string[] = [];
  @Input() enabled: boolean = true;

  isLoading = true;

  options: SelectOption[] = [];

  constructor(private enumService: EnumService) {}

  ngOnInit() {
    if (!this.enabled) return;
    this.enumService.loadEnums([this.key]).then(() => this.getOptions());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['enabled'] && !changes['enabled'].firstChange) {
      if (this.enabled)
        this.enumService.loadEnums([this.key]).then(() => this.getOptions());
    }
  }

  getOptions() {
    if (this.excludeValues) {
      this.options = this.enumService
        .getEnumData(this.key, true)
        .filter((option) => !this.excludeValues.includes(option.value));
    } else {
      this.options = this.enumService.getEnumData(this.key, true);
    }

    this.isLoading = false;
    if (this.defaultValue === undefined) return;
    const defaultOption = this.options.find(
      (option) => option.value == this.defaultValue
    );

    if (!defaultOption) return;
    this.control.setValue(defaultOption.value);
    // Defer marking the control as dirty and touched
    this.control.markAsDirty();
    this.control.markAsTouched();
  }
}
