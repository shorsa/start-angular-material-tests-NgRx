import { animate, style, transition, trigger } from '@angular/animations';

export const fadeDownInput = trigger('fadeDownInput', [
    transition(':enter', [
        style({
            opacity: 0,
            height: 0
        }),
        animate('400ms',
            style({
                opacity: 1,
                height: `{{height}}px`
            })
        )], { params: { height: '70' } }
    ),
    transition(':leave',
        [
            style({
                opacity: 1,
                height: `{{height}}px`

            }),
            animate('400ms',
                style({
                    opacity: 0,
                    height: 0
                })
            )], { params: { height: '0' } }
    )
]);
