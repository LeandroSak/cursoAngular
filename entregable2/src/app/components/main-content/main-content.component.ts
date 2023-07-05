import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})



export class MainContentComponent {
  arrayAlumnos=[
    {
      edad: 25,
      first_name: "Michael",
      last_name: "Lawson",
      email: "michael@email.com"
  },
  {
      edad: 40,
      first_name: "Lindsay",
      last_name: "Ferguson",
      email: ""
  },
  {
      edad: 30,
      first_name: "Tobias",
      last_name: "Funke",
      email: ""
  },
  {
      edad: 28,
      first_name: "Byron",
      last_name: "Fields",
      email: "byron@email.com"
  },
  {
      edad: 32,
      first_name: "George",
      last_name: "Edwards",
      email: "george@email.com"
  },
  {
      edad: 36,
      first_name: "Rachel",
      last_name: "Howell",
      email: ""
  }
    
  ]
  
}

