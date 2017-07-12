var container;
var camera, scene, renderer;
var moon,earth,plane;
var star;
var movementSpeed = 200;
var totalObjects = 1000;
var objectSize = 5;
var dirs = [];
var parts = [];


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
        //renderer.setClearColor(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
        
        //criando a terra
        var earthGeometry = new THREE.SphereGeometry(10, 32, 32);
        var earthMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('texture/earth.jpeg'),color:0xffffff});
        earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.rotation.x = 30 * Math.PI / 180;
        earth.position.x = 70;
        earth.position.y = -40;
        earth.position.z = 40;
        scene.add(earth);
        
        //criando lua
        var moonGeometry = new THREE.SphereGeometry(7, 32, 32);
        var moonMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('texture/moon.jpeg'),color:0xffffff});
        moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.rotation.x = 30 * Math.PI / 180;
        moon.position.x = -25;
        moon.position.y = 15;
        moon.position.z = -15;
        scene.add(moon);
        
        
         //criando Marte
        var starGeometry = new THREE.SphereGeometry(9, 32, 32);
        var starMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('texture/mars.jpg'),color:0xffffff});
        star = new THREE.Mesh(starGeometry, starMaterial);
        //star.rotation.x = 30 * Math.PI / 180;
        star.position.x = 120;
        star.position.y = -60;
        star.position.z = -50;
        scene.add(star);
        
        var loader = new THREE.OBJLoader();
				loader.load('models/vader.obj', function ( object ) {

					object.traverse( function ( child ) {
					  object.scale.x=5;
					  object.scale.y=5;
					  object.scale.z=5;
					  object.position.x = -10.5;
					  object.rotation.y = -45 * Math.PI/180;
            object.position.y = 10;
            object.position.z = 13;
            console.log(object);
					  scene.add( object );
					  
					  document.addEventListener("keydown", onDocumentKeyDown, false);
            function onDocumentKeyDown(event) {
                var keyCode = event.which;
               //W
                if (keyCode == 87) {
                  if(object.position.y < 47){  
                    object.position.y += 0.5;
                    camera.position.y += 0.5;
                  }
                }//S
                else if (keyCode == 83) {
                    object.position.x -= 0.5;
                    camera.position.x -= 0.5;
                }//A
                else if (keyCode == 65) {
                  if(object.position.x > -68){                                                 
                    object.position.x -= 0.5;
                    camera.position.x -= 0.5;
                  }
                }//D 
                else if (keyCode == 68) {
                  
                  object.position.x += 0.5;
                  camera.position.x += 0.5;
    
                }//X -> avança no eixo z
                else if(keyCode == 88){
                  if(object.position.z > -60){ 
                    object.position.z -= 0.5;
                    camera.position.z -= 0.5;
                  }  
                }//Z -> Volta no eixo z
                else if(keyCode == 90){
                  if(object.position.z > -60){ 
                    object.position.z += 0.5;
                    camera.position.z += 0.5;
                  }  
                }//alt
                else if(keyCode == 18){
                  var isBoom = false;
                  var laserGeometry = new THREE.SphereGeometry(5, 32, 32);
                  var laserMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
                  var laser = new THREE.Mesh(laserGeometry, laserMaterial);
                  //star.rotation.x = 30 * Math.PI / 180;
                  laser.position.x = object.position.x;
                  laser.position.y = object.position.y;
                  laser.position.z = object.position.z;
                  var tween = new TWEEN.Tween({x:object.position.x, y:object.position.y, z:object.position.z,rotation:0})
                  .to({x:star.position.x, y:star.position.y,z:star.position.z,rotation:0},2)
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .onUpdate(function(){
                        console.log(Math.abs(laser.position.z - star.position.z));
                        if(Math.abs(laser.position.z - star.position.z) <= 70 && !isBoom){
                          var x = star.position.x;
                          var y = star.position.y;
                          var z = star.position.z;
                          scene.remove(star);
                          parts.push(new ExplodeAnimation(x,y,z));

                          console.log("Boooommm...");
                          isBoom = true;
                      }
                    }).start();
                  }
        
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

function ExplodeAnimation(x,y,z)
{
  var geometry = new THREE.Geometry();
  
  for (i = 0; i < totalObjects; i ++) 
  { 
    var vertex = new THREE.Vector3();
    vertex.x = x;
    vertex.y = y;
    vertex.z = z;
  
    geometry.vertices.push( vertex );
    dirs.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
  }
  var material = new THREE.ParticleBasicMaterial( { size: objectSize,  color:0x8b0000});
  var particles = new THREE.ParticleSystem( geometry, material );
  
  this.object = particles;
  this.status = true;
  
  this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  
  scene.add(this.object); 
  
  this.update = function(){
    if (this.status === true){
      var pCount = totalObjects;
      while(pCount--) {
        var particle = this.object.geometry.vertices[pCount];
        particle.y += dirs[pCount].y;
        particle.x += dirs[pCount].x;
        particle.z += dirs[pCount].z;
      }
      this.object.geometry.verticesNeedUpdate = true;
    }
  };
  
  var pCount = parts.length;
  while(pCount--) 
  {
    parts[pCount].update();
  }
  renderer.render( scene, camera );
  
}


function animate() {

	requestAnimationFrame(animate);
	TWEEN.update();
	render();

}

function render() {
	earth.rotation.y += 0.01;
	moon.rotation.y += 0.01;
	star.rotation.y += 0.01;
	renderer.render(scene, camera);

}