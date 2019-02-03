import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public correo: String;
  public numero: String;

  constructor() { 
    this.correo = 'alva.va.martinez@gmail.com';
    this.numero = '(+52) 55 - 50 - 67 - 87 - 01';
  }

  ngOnInit() {
  }
  onSubmit(form){
    console.log(form);
    
  }

}
