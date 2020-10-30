import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
photos:any=[];

  constructor(private imagePicker: ImagePicker,public file:File) {

  }


  imgpicker(){

    var options:ImagePickerOptions=
    {
        maximumImagesCount:3,
        width:100,
        height:100,
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {

        let filename = results[i].substring(results[i].lastIndexOf('/')+1);
        let path = results[i].substring(0,results[i].lastIndexOf('/')+1);
        this.file.readAsDataURL(path,filename).then((base64string)=>{
this.photos.push(base64string)
        })
       console.log('Image URI: ' + results[i]);
       console.log('Image URI: ' ,this.photos.img);
      }
    }, (err) => { })

  }
}
