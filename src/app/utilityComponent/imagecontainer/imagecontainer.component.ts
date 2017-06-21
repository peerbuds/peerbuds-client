import { Component, ElementRef } from '@angular/core'

@Component({
    selector: 'image-container',
    template: `
        <input type="file" (change)="changeListener($event)" />
        <img class="image" />
    `,
})
export class ImageContainerComponent {
    constructor(private element: ElementRef) {}

    changeListener(event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        /*reader.onload = function(e:any) {
            var src = e.target.result;
            image.src = src;
        };

        reader.readAsDataURL(event.target.files[0]);*/
    }
}
