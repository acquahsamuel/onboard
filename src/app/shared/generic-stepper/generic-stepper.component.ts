import { Component, OnInit } from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';


export class GenericStepperComponent extends CdkStepper {
  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}

/** @title A custom CDK stepper without a form */
// @Component({
//   selector: 'cdk-custom-stepper-without-form-example',
//   templateUrl: './cdk-custom-stepper-without-form-example.html',
//   styleUrls: ['./cdk-custom-stepper-without-form-example.css']
// })
// export class CdkCustomStepperWithoutFormExample {}

/** Custom CDK stepper component */
@Component({
  selector: 'example-custom-stepper',
  templateUrl: 'generic-stepper.component.html',
  styleUrls: ['./generic-stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: CustomStepper}]
})
export class CustomStepper extends CdkStepper {
  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}