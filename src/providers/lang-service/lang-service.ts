import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class LangServiceProvider {

  languages :any = [  { title: "Hindi" },
  { title: "Bengali" },
  { title: "Urdu" },
  { title: "Punjabi" },
  { title: "Telugu" },
  { title: "Tamil" },
  { title: "Gujarati" },
  { title: "Kannada" },
  { title: "Odia" },
  { title: "Malayalam" },
  { title: "Sanskrit" },
   { title: "Santali" },
   { title: "Marathi" },

   { title: "English" },  
   { title: "Marathi" }, 
    { title: "German" },  
    { title: "Italian" },  
    { title: "Hausa" },
   { title: "Foreign language" },
     { title: "Telugu" },  
     { title: "Vietnamese" },
       { title: "Egyptian Arabic" }, 
        { title: "Kannada" },
   { title: "Portuguese" },
     { title: "Wu Chinese" },
       { title: "Tamil" },  
       { title: "Gujarati" }, 
        { title: "Indonesian" },
   { title: "Russian" }, 
    { title: "Turkish" },
      { title: "Yue Chinese" }, 
       { title: "Iranian Persian" }, 
        { title: "Polish" },
   { title: "Japanese" }, 
    { title: "Korean" },  
    { title: "Urdu" }, 
     { title: "Min Nan Chinese" },  
     { title: "Yoruba" },
   { title: "Western Punjabi" }, 
    { title: "French" },  
    { title: "Javanese" },  
    { title: "Hakka Chinese" },
  
];

  

  constructor(public http: HttpClient) {
   
  }
  
}
