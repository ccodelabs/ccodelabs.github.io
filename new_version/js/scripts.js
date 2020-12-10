$(document).ready(function() {
    $("body").tooltip({ 
        selector: '[data-toggle=tooltip]' 
    });

    // Fire up ThreeJS background
    VANTA.WAVES({
        el: "#backAnim",
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: '#212121',
        shininess: 40.00,
        waveHeight: 20.00,
        waveSpeed: 0.5,
        zoom: 1
    });
    
    // TypeJS data build
    var iText_TypeJS = new Typed('#infoText_TypeJS', {
        strings: ['Details are the key for perfection...', 'Satisfying our customers is our number one rule!'],
        typeSpeed: 50,
        loop: true,
        backDelay: 4000
    });

    // ThreeJS 3D Model build
    let esp32_Scene, esp32_Camera, esp32_Renderer;
    function init3DModel() {
        /* Scene Section */
        esp32_Scene = new THREE.Scene();
        esp32_Scene.Background = new THREE.Color(0xeceff1);
        esp32_Camera = new THREE.PerspectiveCamera(10, (((window.innerWidth*0.9)-2)/(window.innerHeight*0.9)), 1, 5000);
        esp32_Camera.rotation.y = 45/180*Math.PI;
        esp32_Camera.position.x = 300;
        esp32_Camera.position.y = 100;
        esp32_Camera.position.z = 500;
        
        /* Lights Section */
        aLight = new THREE.AmbientLight(0x37474f, 1);
        esp32_Scene.add(aLight);
        light_1 = new THREE.PointLight(0xc4c4c4, 0.85);
        light_1.position.set(0, 300, 500);
        esp32_Scene.add(light_1);
        light_2 = new THREE.PointLight(0xc4c4c4, 0.85);
        light_2.position.set(500, 100, 0);
        esp32_Scene.add(light_2);
        light_3 = new THREE.PointLight(0xc4c4c4, 0.85);
        light_3.position.set(0, 100, -500);
        esp32_Scene.add(light_3);
        light_4 = new THREE.PointLight(0xc4c4c4, 0.85);
        light_4.position.set(-500, 100, 0);
        esp32_Scene.add(light_4);

        /* Render Section */
        esp32_Renderer = new THREE.WebGLRenderer({ antialias: true });
        esp32_Renderer.setClearColor(0x263238, 0.8);
        esp32_Renderer.setSize(((window.innerWidth*0.9)-2), (window.innerHeight*0.9));
        esp32_Renderer.shadowMap.enabled = true;
        $("#electroModal #divCanvas").append(esp32_Renderer.domElement);
        controls = new THREE.OrbitControls(esp32_Camera, esp32_Renderer.domElement);

        /* Texture Background Section */
        const backLoader = new THREE.TextureLoader();
        const texture = backLoader.load('img/backgrounds/office.jpeg',() => {
            texture.anisotropy = esp32_Renderer.getMaxAnisotropy();
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
            rt.fromEquirectangularTexture(esp32_Renderer, texture);
            esp32_Scene.background = rt;
        });

        /* Load Section */
        let loader = new THREE.GLTFLoader();
        loader.load('models/ESP32/scene.gltf', function(gltf) {
            model = gltf.scene.children[0];
            model.scale.set(1, 1, 1);
            // Centering model geometry
            const centerBox = new THREE.Box3().setFromObject(gltf.scene);
            const axisCenter = centerBox.getCenter(new THREE.Vector3());
            gltf.scene.position.x += (gltf.scene.position.x - axisCenter.x);
            gltf.scene.position.y += (gltf.scene.position.y - axisCenter.y);
            gltf.scene.position.z += (gltf.scene.position.z - axisCenter.z);
            esp32_Scene.add(gltf.scene);
            animModel();
        });
    }
    function animModel() {
        esp32_Renderer.render(esp32_Scene, esp32_Camera);
        requestAnimationFrame(animModel);
    } init3DModel();
});
// --------------------------------------------------------------------
// Detect full page loading
function onLoad(loading, loaded) {
    if(document.readyState === 'complete'){
        return loaded();
    } loading();
    if (window.addEventListener) {
        window.addEventListener('load', loaded, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onload', loaded);
    }
};
// Hide/Remove load section
onLoad(function(){ },
function(){
    $("#loadingScreen").fadeOut(500, function() {
        $("#backAnim").fadeIn(1000).removeClass("invisible").addClass("visible");
        $("#mContainer").fadeIn(500).removeClass("invisible").addClass("visible");
        $("#loadingScreen").remove();
     });
});
// --------------------------------------------------------------------
// ScrollMagic
$(function (){
    // Main Controller
    var mController = new ScrollMagic.Controller();
    TweenLite.defaultEase = Linear.easeNone;
    /* *************************************** */

    // Landing Timeline + Scene
    var landTimeline = new TimelineMax();
    landTimeline.fromTo("#landingSection #sideMenu", 1, 
        {x: "100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#sideMenu #sideBar_01", 1, 
        {scale: 1, ease: Linear.easeNone}, 
        {scale: 1.2, rotation: 50, ease: Linear.easeNone}
    ).fromTo("#landingSection #landing_01", 1, 
        {x: "100%", opacity: 0.25, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#landingSection svg#scrollLogo", 1, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}, 
        {scale: 0.25, opacity: 0, ease: Linear.easeNone}
    ).fromTo("#landingSection #landing_02", 1, 
        {y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#landingSection #landTitle_1", 1, 
        {y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#landingSection #landTitle_2", 1, 
        {y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#landingSection #landTitle_3", 1, 
        {y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#landingSection",
        triggerHook: "onLeave",
        duration: "200%"
    })
    .setPin("#landingSection")
    .setTween(landTimeline)
    .addTo(mController);
    /* *************************************** */

    // About Timeline + Scene
    var aboutTimeline = new TimelineMax();
    aboutTimeline.fromTo("#sideMenu #sideBar_02", 1, 
        {scale: 1, ease: Linear.easeNone}, 
        {scale: 1.2, rotation: 50, ease: Linear.easeNone}
    ).fromTo("#aboutSection #aboutTitle_1", 1, 
        {y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#aboutSection #aboutTitle_2", 1, 
        {y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#aboutSection #robotDiv", 1, 
        {scale: 0.5, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #iterationsDiv", 1, 
        {scale: 0.5, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #teamDiv", 1, 
        {scale: 0.5, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #mindsetDiv", 1, 
        {scale: 0.5, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#aboutSection",
        triggerHook: "onLeave",
        duration: "200%"
    })
    .setPin("#aboutSection")
    .setTween(aboutTimeline)
    .addTo(mController);
    /* *************************************** */

    // Info Timeline + Scene
    var infoTimeline = new TimelineMax();
    infoTimeline.fromTo("#infoSection #infoSection_01", 1, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#infoSection #infoText_01", 1, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#infoSection #infoSection_02", 1, 
        {x: "100%", ease: Linear.easeNone}, 
        {x: "0%", ease: Linear.easeNone}
    ).fromTo("#infoSection #infoText_02", 1, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#infoSection", 1, 
        {ease: Linear.easeNone}, 
        {x: "100%", opacity: 0.25, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#infoSection",
        triggerHook: "onLeave",
        duration: "200%"
    })
    .setPin("#infoSection")
    .setTween(infoTimeline)
    .addTo(mController);
    /* *************************************** */

    // Work Timeline + Scene
    var workTimeline = new TimelineMax();
    workTimeline.fromTo("#sideMenu #sideBar_03", 1, 
        {scale: 1, ease: Linear.easeNone}, 
        {scale: 1.2, rotation: 50, ease: Linear.easeNone}
    ).fromTo("#workSection #workTitle", 1, 
        {scale: 0.25, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_01", 1, 
        {x: "50%", y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "50%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_01", 1, 
        {x: "50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_02", 1, 
        {x: "50%", y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "50%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_02", 1, 
        {x: "50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_03", 1, 
        {x: "50%", y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "50%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_03", 1, 
        {x: "50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #svgBox_01", 1, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}, 
        {scale: 0.75, opacity: 0.5, ease: Linear.easeNone}
    ).fromTo("#workSection #svgBox_02", 1, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}, 
        {scale: 0.75, opacity: 0.5, ease: Linear.easeNone}
    ).fromTo("#workSection #svgBox_03", 1, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}, 
        {scale: 0.75, opacity: 0.5, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#workSection",
        triggerHook: "onLeave",
        duration: "200%"
    })
    .setPin("#workSection")
    .setTween(workTimeline)
    .addTo(mController);
    /* *************************************** */

    // Team Timeline + Scene
    var teamTimeline = new TimelineMax();
    teamTimeline.fromTo("#sideMenu #sideBar_04", 1, 
        {scale: 1, ease: Linear.easeNone}, 
        {scale: 1.2, rotation: 50, ease: Linear.easeNone}
    ).fromTo("#teamSection #teamTitle", 1, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamTitle #teamText", 1, 
        {scale: 3, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamSection #teamTitle", 1, 
        {ease: Linear.easeNone}, 
        {opacity: 0, ease: Linear.easeNone}
    ).fromTo("#teamSection #teamContent", 1, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamLogo", 1, 
        {x: "-100%", y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamLogo #logoIMG", 1, 
        {x: "-50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_01", 1, 
        {x: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_02", 1, 
        {x: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_03", 1, 
        {x: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_04", 1, 
        {y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_05", 1, 
        {x: "-100%", y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_06", 1, 
        {x: "-100%", y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_07", 1, 
        {x: "-100%", y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamLogo", 1, 
        {ease: Linear.easeNone},
        {opacity: 0.25, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#teamSection",
        triggerHook: "onLeave",
        duration: "300%"
    })
    .setPin("#teamSection")
    .setTween(teamTimeline)
    .addTo(mController);
    /* *************************************** */

    // Partners Timeline + Scene
    var partnersTimeline = new TimelineMax();
    partnersTimeline.fromTo("#sideMenu #sideBar_05", 1, 
        {scale: 1, ease: Linear.easeNone}, 
        {scale: 1.2, rotation: 50, ease: Linear.easeNone}
    ).fromTo("#partnersSection #partnersTitle", 1, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#partnersSection #partnersText", 1, 
        {scale: 0.5, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo("#partnersSection #partnersText", 1, 
        {ease: Linear.easeNone}, 
        {opacity: 0, ease: Linear.easeNone}
    ).fromTo("#partnersSection #partnersTitle", 1, 
        {ease: Linear.easeNone}, 
        {opacity: 0, ease: Linear.easeNone}
    ).fromTo("#partnersContent #partner_01", 1, 
        {x: "-100%", ease: Linear.easeNone}, 
        {x: "0%", ease: Linear.easeNone}
    ).fromTo("#partnersContent #partner_02", 1, 
        {y: "50%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#partnersContent #partner_03", 1, 
        {x: "100%", ease: Linear.easeNone}, 
        {x: "0%", ease: Linear.easeNone}
    ).fromTo("#partnersContent", 1, 
        {ease: Linear.easeNone}, 
        {scale: 0.5, opacity: 0.5, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#partnersSection",
        triggerHook: "onLeave",
        duration: "200%"
    })
    .setPin("#partnersSection")
    .setTween(partnersTimeline)
    .addTo(mController);
    /* *************************************** */

    // Contacts Timeline + Scene
    var contactsTimeline = new TimelineMax();
    contactsTimeline.fromTo("#sideMenu #sideBar_06", 1, 
        {scale: 1, ease: Linear.easeNone}, 
        {scale: 1.2, rotation: 50, ease: Linear.easeNone}
    ).fromTo("#contactsSection #backDark", 1, 
        {x: "-50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#contactsSection #backLight", 1, 
        {scale: 0.5, opacity: 0.25, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#contactsSection",
        triggerHook: "onLeave",
        duration: "100%"
    })
    .setPin("#contactsSection")
    .setTween(contactsTimeline)
    .addTo(mController);
    /* *************************************** */
});