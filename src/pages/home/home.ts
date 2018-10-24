import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import cv  from 'opencv.js';
import { getHostElement } from '@angular/core/src/render3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  varFoto: any;
  image;
 // imageData;
  //image: new Image();
  constructor(public navCtrl: NavController, public camera: Camera) {

  }

  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500
    }

    //var srcType = Camera.PictureSourceType.CAMERA;

    
   /* navigator.camera.getPicture(onSucess, onFail, {
      quality: 50, 
      destinationType: Camera.DestinationType.FILE_URI }
    );*/

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
      this.image =  new Image();
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     let base64Image = imageData;
     this.image.appendChild = base64Image;
       //document.appendChild(base64Image);
     this.image.src = base64Image;

     console.log("Caminho Imagem: " + this.image.src);
     //console.log("Tamanho:" + this.image);
     //console.log(image.width  + " Altura: " + this.image.height);
     //console.log("pixel" + this.image.)
     //let base64Image =  imageData;
     //onSucess(base64Image);
     //console.log(base64Image);
     //this.imageConvert();
    }, (err) => {
     // Handle error
     console.log(err);
    });

    /*** 
     * Essa função onSucess e onFail é para IOs
    */
    
    /*function onSucess(imageURI) {
      this.image.src = imageURI;
      console.log(this.image.src);
    }

    function onFail(message){
      alert('Falha' + message);
    }*/
  }

  /**
   * 
   * 
   * 
   * @memberOf HomePage
   */
  imageConvert(){ // 
    //console.log(' ');
    
    // let mat = cv.imdecode(this.picture, 0);
    // let mat = cv.data(this.picture, 0);
    //this.varFoto = '../src/assets/imgs/teste.jpg'
    //let canvasOutput = document.getElementById("canvasOutput");

    let src = cv.imread(this.image, 1); 
    console.log("deu certo!")
    let dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow('canvasOutput', dst);
    src.delete();
    dst.delete();
    //cv.imshow("canvasOutput", mat);
    //mat.delete();

    //console.log("Essa funcao plota: " + mat);
    //console.log('Funciona Porra');
    /*let dst = new cv.Mat();
    let dst2 = new cv.Mat();
    let rect = new cv.Rect(0, 0, mat.rows , mat.cols/4);
    
    
    cv.cvtColor(mat, dst, cv.COLOR_RGBA2GRAY, 0);
    dst2 = dst.roi(rect);
    let m = [[]]
    for ( let i = 0; i < dst2.rows; i++){
        for ( let j = 0; j < dst2.cols; j++){
         m[i][j] = dst2.ucharPtr(i,j) // matriz aqui
          console.log(m[i][j]);
        }
    }
    //console.log(m);

    mat.delete();
    dst.delete();
    rect.delete();
    dst2.delete();*/
  }

}
