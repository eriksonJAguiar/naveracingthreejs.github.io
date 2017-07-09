var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var moon,earth,plane;
var laser;


function start(){
	init();
	animate();
}


function init() {

       //cena
        scene = new THREE.Scene();

        //camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        scene.add(camera);

        //renderizando
        renderer = new THREE.WebGLRenderer({antialias:true});
        //renderer.clear();
        renderer.setClearColor(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
        
        //criando estrelas
        // var starMaterial = new THREE.MeshBasicMaterial({overdraw: true});
        // var starGeometry = new THREE.SphereGeometry();
        // for (var i = 0; i < 3; i++) {
        //   var star = new THREE.Mesh(starGeometry.clone());
        //   star.position.x = Math.floor(Math.random() * 200 - 100) * 4;
        //   star.position.z = Math.floor(Math.random() * 200 - 100) * 4;
        //   star.scale.x = Math.random() * 5 + 8;
        //   star.scale.y = Math.random() * star.scale.x * 4 + 5;
        //   star.scale.z = star.scale.x;
        //   THREE.GeometryUtils.merge(starGeometry, star);
        // }
        // var stars = new THREE.Mesh(starGeometry, starMaterial);
        // scene.add(stars);
        
        var parent = new THREE.Object3D();
        scene.add( parent );

        //criando a pista
        var planeGeometry = new THREE.PlaneGeometry(40, 200, 32);
        var planeMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture("texture/pista.jpg"),color: 0x636161,side: THREE.DoubleSide});
        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.rotation.z = -72.99;
        plane.position.z = 0;
        
         scene.add(plane);
        
        
        
        //criando a terra
        var earthGeometry = new THREE.SphereGeometry(7, 24,0,2* Math.PI/2);
        var earthMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('texture/earth.jpeg'),color:0xffffff});
        earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.rotation.x = 30 * Math.PI / 180;
        earth.position.x = 80;
        earth.position.y = -50;
        earth.position.z = 30;
        scene.add(earth);
        
        //criando marte
        var moonGeometry = new THREE.SphereGeometry(7, 24, 0,2* Math.PI/2);
        var moonMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('texture/moon.jpeg'),color:0xffffff});
        moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.rotation.x = 30 * Math.PI / 180;
        moon.position.x = -25;
        moon.position.y = 15;
        moon.position.z = -15;
        scene.add(moon);
        
        var loader = new THREE.OBJLoader();
				loader.load('models/vader.obj', function ( object ) {

					object.traverse( function ( child ) {
					  object.scale.x=8;
					  object.scale.y=8;
					  object.scale.z=8;
					  object.position.x = -10.5;
					  object.rotation.y = -45 * Math.PI/180;
            object.position.y = 10;
            object.position.z = 13;
            console.log(object);
					  scene.add( object );
					  
				// 	var laserGeometry = new THREE.SphereGeometry(5, 5);
    //       var laserMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
    //       laser = new THREE.Mesh(laserGeometry, laserMaterial);
    //       //earth.rotation.x = 30 * Math.PI / 180;
    //       laser.position.x = object.position.x*2;
    //       laser.position.y = object.position.y*2;
    //       laser.position.z = object.position.z;
    //       scene.add(laser); 
					  
					  document.addEventListener("keydown", onDocumentKeyDown, false);
            function onDocumentKeyDown(event) {
                var keyCode = event.which;
                    // up
                if (keyCode == 87) {
                    object.position.y += 0.5;
                }else if (keyCode == 83) {
                    object.position.y -= 0.5;
                }else if (keyCode == 65) {
                  if(true){ //falta inserir a condição para determinar os limites que a nave poderá ir 
                    object.position.x -= 0.5;
                    camera.position.x -= 0.5;
                  }
                } else if (keyCode == 68) {
                  if(true){  
                    object.position.x += 0.5;
                    camera.position.x += 0.5;
                  }
                }//else if(keyCode == 88){
                //     for(var i=0;i<50;i++){
                //       laser.position.x *= i;
                //       laser.position.y *= i;
                //       laser.position.z *= i;
                //       renderer.render(scene, camera);
                //     }
                // }
                //render();
                renderer.render(scene, camera);
              }
              
				});
				});
				
        //posicionando a camera
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);

        //luz ambiente
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

        //sombra
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        //saida
        document.getElementById("webgl").appendChild(renderer.domElement);

}



function animate() {

	requestAnimationFrame(animate);
	render();

}

function move(){
  var laserMaterial = new THREE.MeshBasicMaterial({overdraw: true});
  var laserGeometry = new THREE.Geometry();
}

function atirar(){
 
}

function render() {

	//camera.position.x += ( mouseX - camera.position.x ) * 0.5;
	//camera.position.y += ( - mouseY - camera.position.z ) * 0.5;

	//camera.lookAt(scene.position);
	//moon.rotation.x += 0.5;
	earth.rotation.y += 0.01;
	moon.rotation.y += 0.01;
	renderer.render(scene, camera);

}