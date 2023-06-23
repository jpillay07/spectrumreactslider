import React, { Component }  from "react";
import * as THREE from "three";
import star from "../images/Starburst.png"

class ThreeScene extends Component {
    componentDidMount(){

        //Texture Loader
        this.loader = new THREE.TextureLoader();
        this.starBurst = this.loader.load(star);


        //scene
        this.scene = new THREE.Scene();

        //rendere
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(this.renderer.domElement);

        //camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 2;

        //Objects
        this.geometry = new THREE.TorusGeometry(.7, .2, 16, 100);
        this.particleGeometry= new THREE.BufferGeometry();
        const particlesCount = 5000;

        const posArray = new Float32Array(particlesCount * 3);

        for(let i=0; i<particlesCount * 3; i++){
            posArray[i] = (Math.random() - 0.5) * 5;
        }

        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        //Materials
        this.material = new THREE.PointsMaterial({
            size: 0.005
        });

        this.material.color = new THREE.Color("#87e618");

        this.starMaterial = new THREE.PointsMaterial({
            size: 0.003,
            map: this.starBurst,
            transparent: true
        
        });

        this.starMaterial.color = new THREE.Color("#ffffff");

        //Mesh
        this.sphere = new THREE.Points(this.geometry,this.material)
        this.particlesMesh = new THREE.Points(this.particleGeometry,this.starMaterial);
        
        this.scene.add(this.sphere, this.particlesMesh);

        // Lights

        const pointLight = new THREE.PointLight(0xffffff, 0.1)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        this.scene.add(pointLight)

        //Event Handlers
        window.addEventListener("resize", this.handleWindowResize);
        window.addEventListener("mousemove", this.animateParticles);

        this.mouseX = 0;
        this.mouseY = 0;

        //Animation
        this.clock = new THREE.Clock();
        this.animation();
    }

    animation = ()=>{
        
        this.elapsedTime = this.clock.getElapsedTime();
        
        this.sphere.rotation.y = .5 * this.elapsedTime;
        this.sphere.rotation.z = .5 * this.elapsedTime;

        this.particlesMesh.rotation.y = this.mouseY * (this.elapsedTime * 0.000008);
        this.particlesMesh.rotation.x = this.mouseX * (this.elapsedTime * 0.000008);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animation);
    }

    animateParticles = (event)=>{
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    handleWindowResize = ()=>{
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    render(){

        

        return(
            <div
            ref={mount => {
                this.mount = mount;
            }}
            >
                
            </div>
        )
    }
}
export default ThreeScene;