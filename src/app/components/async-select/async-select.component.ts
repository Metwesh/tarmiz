import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
export class AsyncSelectComponent implements OnInit {
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

  isLoading = true;

  options: SelectOption[] = [];

  constructor(
    private enumService: EnumService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.enumService.loadEnums([this.key]).then(() => this.getOptions());
  }

  getOptions() {
    this.options = this.enumService.getEnumData(this.key, true);
    this.isLoading = false;
  }
}
