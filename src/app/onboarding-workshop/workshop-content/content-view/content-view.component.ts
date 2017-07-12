import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'itenary',
    templateUrl: 'content-view.component.html'
})
export class InPersonContentsComponent {
    // we will pass in address from App component
    @Input('group')
    public itenaryForm: FormGroup;
    @Input('itenaryId')
    public itenaryId: Number;

    constructor(
        private _fb: FormBuilder
    ) {
    }

    addContent() {
        console.log(this.itenaryForm);
        const contentArary = <FormArray>this.itenaryForm.controls['contents'];
        contentArary.push(this.initContent());
    }

    initContent() {
        return this._fb.group({
            title: [''],
            startTime: [''],
            endTime: [''],
            pic_url: [''],
            description: [''],
            include: [''],
            prerequisites: ['']
        });
    }

    removeContent(i: number) {
        console.log("Removing");
        const control = <FormArray>this.itenaryForm.controls['contents'];
        control.removeAt(i);
    }
}