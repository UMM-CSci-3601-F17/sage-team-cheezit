import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {

  constructor() { }

  @Input() canEdit: boolean = false;
  @Input() text: string;

  @Output() saveEvent = new EventEmitter();

  public editing: boolean = false;

  public saveEdit(newText: string) {
      this.saveEvent.emit(newText);
  }

  ngOnInit() {
  }

}
