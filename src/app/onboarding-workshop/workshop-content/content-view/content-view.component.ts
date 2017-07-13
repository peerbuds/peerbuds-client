import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'itenary',
    templateUrl: 'content-view.component.html'
})
export class InPersonContentsComponent implements OnInit {
    // we will pass in address from App component
    @Input('group')
    public itenaryForm: FormGroup;
    @Input('itenaryId')
    public itenaryId: Number;

    currentIndex: number;
    dontAllow: true;

    constructor(
        private _fb: FormBuilder
    ) {
    }

    ngOnInit() {
        const content = <FormArray>this.itenaryForm.controls.contents;
        this.currentIndex = content.controls.length - 1;
        console.log(this.currentIndex);
    }

    addContent() {
        console.log("Add Content Triggered");
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

    addIndex() {
        this.currentIndex++;
    }

    resetIndex() {
        this.currentIndex++;
    }
}