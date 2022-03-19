    import * as THREE from "./three.module.js"
    import {MapControls} from "./OrbitControls.js"

    // import vertexShader from './Shaders/VertexShader.glsl'
    // import { createGlowMesh, defaultOptions } from './node_modules/three-glow-mesh';
    
    // console.log(vertexShader);
    // let example = (function(){
    // "use strict";
    let scene = new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer(),
    camera,
    Sphere,
    Space,
    cloud,
    Moon,
    SUN,
    SunColor,
    SunEmission,
    Mars,
    Saturn = new THREE.Group(),
    Uranus,
    Jupiter,
    Neptune,
    controls,
    stats;

    function initScene()
    {
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
   
        camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth/window.innerHeight,
            0.1,
            100000 );
        camera.position.y = 100;
        camera.position.z = 250;

        controls = new MapControls(camera, renderer.domElement);

        scene.add(camera);

        let material;
        let starsMaterial;
        let material1;
        let Moon_Material;
        let SUN_M;
        let Mars_material;

        scene.add(new THREE.AmbientLight(0x333222));

        let light = new THREE.PointLight(0xffffff, 1);
        light.position.set(0,0,0);
        scene.add(light);

    
        // const StarGeometry = new THREE.BufferGeometry();
        // starsMaterial = new THREE.PointsMaterial({
        //         color: 0xffffff
        //         });
        
        // const starsVertices = [];

        // for (let i = 0; i < 50000; i++)
        // {
        //     let x = (Math.random()-0.5)*2000;
        //     // if(x > 0){ x += 1000}
        //     // else{ x -= 1000}
        //     let y = (Math.random()-0.5)*2000;
        //     // if(y > 0){ y += 1000}
        //     // else{ y -= 1000}
        //     let z = (Math.random()-0.5)*2000;
        //     // if(z > 0){ z += 1000}
        //       // else{ z -= 1000}
        //     starsVertices.push(x,y,z);
        // }

        // StarGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        // Space = new THREE.Points(StarGeometry, starsMaterial);


        let StarsTexture = new THREE.TextureLoader().load('starfield.png');//('starfield.png');
        starsMaterial = new THREE.MeshBasicMaterial({
                 map: StarsTexture, 
                 side: THREE.BackSide
               });
        Space = new THREE.Mesh(
         new THREE.SphereGeometry(10000,64,64),
         starsMaterial
         );   
           scene.background = Space  

        // loader.load('earth.jpg', function(texture){
        let earth = new THREE.TextureLoader().load('earth.jpg');
        let elev = new THREE.TextureLoader().load('elev.jpg');
        let water = new THREE.TextureLoader().load('water.png');
        let MoonTexture = new THREE.TextureLoader().load('Moon1.jpg');
        let SUNTexture = new THREE.TextureLoader().load('SUN.jpg');
        let MarsTexture = new THREE.TextureLoader().load('Mars.jpg');
        let SaturnTexture = new THREE.TextureLoader().load('saturn.jfif')
        let saturnRingsTexture = new THREE.TextureLoader().load("https://i.postimg.cc/zz7Gr430/saturn-rings-top.png");
        let UranusTexture = new THREE.TextureLoader().load('Uranus.jpg');
        let JupiterTexture = new THREE.TextureLoader().load('Jupiter.jpg');
        let NeptuneTexture = new THREE.TextureLoader().load('Neptune.jpg');

        material = new THREE.MeshPhongMaterial({
        map:earth,
        bumpMap: elev,
        bumpScale:   0.008,
        specularMap: water,
        specular: new THREE.Color(0x222222)  
        })

        Moon_Material = new THREE.MeshPhongMaterial({
            map:MoonTexture,
            specular: new THREE.Color(0x111111),
            color: new THREE.Color(0xffffff)
            });

        SUN_M = new THREE.MeshStandardMaterial({
            map:SUNTexture,
            color: new THREE.Color('yellow'),
            specular: new THREE.Color('yellow'),
            emissiveMap : new THREE.Color('yellow'),
            metalness: 0,
            side        : THREE.BackSide
            });
           
        Mars_material = new THREE.MeshPhongMaterial({
        map:MarsTexture,
        specular: new THREE.Color(0x111111),
        color: new THREE.Color(0xffffff)
        });

        Mars = new THREE.Mesh(
            // radius, width segment, hight segment
        new THREE.SphereGeometry(4,45,45),
        Mars_material
        );

        Sphere = new THREE.Mesh(
            // radius, width segment, hight segment
        new THREE.SphereGeometry(5,45,45),
        material
        );

        SUN = new THREE.Mesh(
            // radius, width segment, hight segment
        new THREE.SphereGeometry(50,45,45),
        SUN_M
        );

        Uranus = new THREE.Mesh(
          new THREE.SphereGeometry(6.2, 64, 64),
          new THREE.MeshLambertMaterial({
            map: UranusTexture
          }
        ))

        Jupiter = new THREE.Mesh(
          new THREE.SphereGeometry(8.5, 64, 64),
          new THREE.MeshLambertMaterial({
            map: JupiterTexture
          }
        ))

        Neptune = new THREE.Mesh(
          new THREE.SphereGeometry(6.8, 64, 64),
          new THREE.MeshLambertMaterial({
            map: NeptuneTexture
          }
        ))

       //#region Saturn
   
       const ringsGeometry = new THREE.RingBufferGeometry(7, 20, 64);
       var pos = ringsGeometry.attributes.position;
       var v3 = new THREE.Vector3()
       for (let i = 0; i < pos.count; i++){
         v3.fromBufferAttribute(pos, i);
         ringsGeometry.attributes.uv.setXY(i, v3.length() < 14 ? 0 : 1, 1);
       }
     
       const saturnRingsMaterial = new THREE.MeshToonMaterial({
         map: saturnRingsTexture,
         color: 0xffffff,
         side: THREE.DoubleSide,
         transparent: true
       });
       const ringsMesh = new THREE.Mesh(ringsGeometry, saturnRingsMaterial);
     Saturn.add(ringsMesh);
     const saturn = new THREE.Mesh(
      new THREE.SphereGeometry(7, 64, 64),
      new THREE.MeshLambertMaterial({
        map: SaturnTexture
      }
    ))
    saturn.castShadow = true;
    ringsMesh.receiveShadow = true;
    ringsMesh.material.opacity = 0.4
    Saturn.add(saturn);
    ringsMesh.rotation.x=22/14
    //ringsMesh.position.set(new THREE.Vector3(100,100,0));
  
          //#endregion

        //// Example for custom shader
        // SunColor = new THREE.Mesh(
        // new THREE.SphereGeometry(10,45,45),
        // new THREE.ShaderMaterial({
        //         vertexShader: document.getElementById("vertexShader").textContent,
        //         fragmentShader: document.getElementById("fragmentShader").textContent,
        //         uniforms:{
        //             sunTexture:{
        //                 value: new THREE.TextureLoader().load('SUN.jpg')
        //             }
        //         }
        //     })
        //  );
        SunColor = new THREE.Mesh(
            new THREE.SphereGeometry(56,45,45),
            new THREE.ShaderMaterial({
                    vertexShader: document.getElementById("atmosphereVertex").textContent,
                    fragmentShader: document.getElementById("atmosphereFragment").textContent,
                    blending: THREE.AdditiveBlending,
                    side: THREE.BackSide        
                })
            );
        SunEmission = new THREE.Mesh(
        new THREE.SphereGeometry(53,45,45),
        new THREE.ShaderMaterial({
                vertexShader: document.getElementById("atmosphereVertex").textContent,
                fragmentShader: document.getElementById("atmosphereFragment").textContent,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide,
                transparent:true,
                opacity:0.8
            })
        );

        Moon = new THREE.Mesh(
            // radius, width segment, hight segment
        new THREE.SphereGeometry(1,45,45),
        Moon_Material
        );

    
            // var LOAD = new THREE.TextureLoader();
            // Loader.load('e.PNG', function(texture){
        let cloudtexture = new THREE.TextureLoader().load('clouds.png');
        material1 = new THREE.MeshPhongMaterial({
          map: cloudtexture,
          side        : THREE.DoubleSide,
          opacity     : 1,
          transparent : true,
          depthWrite  : false,
          //specular: new THREE.Color(0x222222)
          });
            

            cloud = new THREE.Mesh(
             new THREE.SphereGeometry(5.02,45,45),
             material1
             );
             cloud.name = "cloud";
             scene.add(cloud);

             Mars.name = "Mars";
             scene.add(Mars);

             Space.name = "Space";
            scene.add(Space);

            Sphere.name = "Sphere";
            scene.add(Sphere);

            Moon.name = "Moon";  
            scene.add(Moon);

            Jupiter.name = "Jupiter";  
            scene.add(Jupiter);

            Uranus.name = "Uranus";  
            scene.add(Uranus);

            Neptune.name = "Neptune";  
            scene.add(Neptune);

            // SUN.name = "SUN";
            // scene.add(SUN);

            SunEmission.name = "SunEmission";
           scene.add(SunEmission);
            SunEmission.name = "SunColor";
            scene.add(SunColor);
        Saturn.name = "Saturn"
        scene.add(Saturn);
            //Add stats to visualize performance
            stats = new Stats();
            stats.setMode(0);
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '10px';
            stats.domElement.style.top = '0px';
            document.body.appendChild(stats.domElement);
            //Render scene 
            render();     
    }
    //var controls = new THREE.TrackballControls(camera);
    let dx = 0;
    scene.remove('Moon');

    // function for rendering, recursive function
    function render()
    {
        Space.position.x = camera.position.x
        Space.position.y = camera.position.y
        Space.position.z = camera.position.z

        controls.update();
        let x = 120;
        let z = 120;
        dx += 0.001;
        Sphere.position.x = 2.9*x*Math.sin(0.45*dx);
        Sphere.position.z = 2.9*z*Math.cos(0.45*dx);
        cloud.position.x =  2.9*x*Math.sin(0.45*dx);
        cloud.position.z =  2.9*z*Math.cos(0.45*dx);
        cloud.rotation.z =  0.023;
        Sphere.rotation.z = 0.0623;
        cloud.rotation.x =  0.0623;
        Sphere.rotation.x = 0.0623;
        cloud.rotation.y += 0.015;
        Sphere.rotation.y += 0.06;

    
        Moon.position.x = Sphere.position.x + 0.35*x*Math.sin(7*dx);// + z*Math.cos(dx);
        Moon.position.z = Sphere.position.z + 0.35*z*Math.cos(7*dx);//x*Math.cos(dx)+
        Moon.rotation.y += 0.02;
    
        //Sphere.rotation.z = 0.007;
       // SunColor.rotation.y += 0.004;
        SunEmission.rotation.y += 0.004;
        SunEmission.position.set(0,0,0)
        //Sphere.rotation.z = 0.01;
       
        Mars.position.x  = 4*x*Math.sin(0.5*dx);
        Mars.position.z  = 4*z*Math.cos(0.5*dx);
        Mars.rotation.y += 0.05;

        Saturn.position.x  = 7*x*Math.sin(0.4*dx);
        Saturn.position.z  = 7*z*Math.cos(0.4*dx);
        Saturn.rotation.y += 0.05;

        Jupiter.position.x  = 5.5*x*Math.sin(0.5*dx);
        Jupiter.position.z  = 5.5*z*Math.cos(0.5*dx);
        Jupiter.rotation.y += 0.05;

       Uranus.position.x  = 8.5*x*Math.sin(0.3*dx);
       Uranus.position.z  = 8.5*z*Math.cos(0.3*dx);
       Uranus.rotation.y += 0.05;

       Neptune.position.x  = 10*x*Math.sin(0.3*dx);
       Neptune.position.z  = 10*z*Math.cos(0.3*dx);
       Neptune.rotation.y += 0.05;
       
        renderer.render(scene, camera);
        requestAnimationFrame(render);

        stats.update();
    }

    window.onload = initScene;

    // return{
    //     scene: scene
    // }
//})();