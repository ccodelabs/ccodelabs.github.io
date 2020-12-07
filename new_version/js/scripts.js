$(document).ready(function() {
    // Fire up VideoJS background
    videojs('bg-video', {
        "width": "100%",
        "height": "100%",
        "fluid": true,
        "muted": true,
        "autoplay": true,
        "loop": true
    }).Background();
    
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
    
    // jQuery Mapael data build
    $("#partnersSection").mapael({
        map: {
            name: "world_countries",
            // Enable zoom on the map
            zoom: { enabled: false },
            // Set default plots and areas style
            defaultPlot: {
                attrs: {
                    fill: "#90a4ae",
                    opacity: 0.6
                },
                attrsHover: { opacity: 1 },
                text: {
                    attrs: { fill: "#f66641" },
                    attrsHover: { fill: "#000" }
                }
            },
            defaultArea: {
                attrs: {
                    fill: "#78909c", 
                    opacity: 0.6,
                    stroke: "#546e7a"
                },
                attrsHover: { fill: "#ff6e40" }
            }
        },
        // Add some plots on the map
        plots: {
            'CCode': {
                type: "image",
                url: "img/logos/onlyLogo.png",
                width: 43,
                height: 15,
                latitude: 40.624870,
                longitude: -8.645730,
                attrs: { opacity: 0.25 },
                attrsHover: { transform: "s1.2" }
            },
            'Qiba': {
                type: "image",
                url: "img/clients/1_new.png",
                width: 33,
                height: 15,
                latitude: 40.624870,
                longitude: -8.645730,
                attrs: { opacity: 1 },
                attrsHover: { transform: "s1.5" },
                href: "https://qiba.pt/",
                target: "_blank",
                tooltip: { content: "<span style=\"font-weight:bold;\">Partner :</span> qiba.connect" }
            },
            'Barix': {
                type: "image",
                url: "img/clients/2.jpg",
                width: 27,
                height: 5,
                latitude: 47.3989685,
                longitude: 8.6039575,
                attrs: { opacity: 0.25 },
                attrsHover: { transform: "s1.2" },
                href: "https://www.barix.com/",
                target: "_blank",
                tooltip: { content: "<span style=\"font-weight:bold;\">Partner :</span> Barix" }
            },
            'Qibixx': {
                type: "image",
                url: "img/clients/3.jpg",
                width: 50,
                height: 19,
                latitude: 47.1662641,
                longitude: 9.4727192,
                attrs: { opacity: 1 },
                attrsHover: { transform: "s1.5" },
                href: "https://www.qibixx.com/pt/",
                target: "_blank",
                tooltip: { content: "<span style=\"font-weight:bold;\">Partner :</span> Qibixx" }
            },
            'Barix': {
                type: "image",
                url: "img/clients/2.jpg",
                width: 53,
                height: 10,
                latitude: 44.968033,
                longitude: -92.9582556,
                attrs: { opacity: 1 },
                attrsHover: { transform: "s1.4" },
                href: "https://www.barix.com/",
                target: "_blank",
                tooltip: { content: "<span style=\"font-weight:bold;\">Partner :</span> Barix" }
            }
        }
    });
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
        $("#bg-video").fadeIn(1000).removeClass("invisible").addClass("visible");
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

    // Scroll Timeline + Scene
    var scrollTimeline = new TimelineMax();
    scrollTimeline.fromTo("svg#scollLogo", 4, 
        {y: "100%", opacity: 1, ease: Linear.easeNone}, 
        {y: "0%", opacity: 0, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#scrollIndicator",
        triggerHook: 0.5,
        duration: 1000
    })
    .setTween(scrollTimeline)
    .addTo(mController);
    /* *************************************** */

    // Landing Timeline + Scene
    var landTimeline = new TimelineMax();
    landTimeline.fromTo("section#landing_01", 4, 
        {x: "100%", opacity: 0.25, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("section#landing_02", 4, 
        {y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    );
    landTimeline.fromTo("div#landTitle_1", 4, 
        {y: "200%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("div#landTitle_2", 4, 
        {y: "200%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("div#landTitle_3", 4, 
        {y: "200%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("div#divLanding", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 0.25, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#divLanding",
        triggerHook: "onLeave",
        duration: 2500
    })
    .setPin("#divLanding")
    .setTween(landTimeline)
    .addTo(mController);
    /* *************************************** */

    // About Timeline + Scene
    var aboutTimeline = new TimelineMax();
    aboutTimeline.fromTo("div#aboutTitle_1", 4, 
        {y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("div#aboutTitle_2", 4, 
        {y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("section#about_01", 4, 
        {scale: 0.5, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    );
    aboutTimeline.fromTo(".aboutPanel #robotDiv", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #robotSVG", 4, 
        {scale: 0.25, opacity: 0.25, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #robotText", 4, 
        {y: "50%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    );
    aboutTimeline.fromTo(".aboutPanel #iterationsDiv", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #iterationsSVG", 4, 
        {scale: 0.25, opacity: 0.25, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #iterationsText", 4, 
        {y: "50%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    );
    aboutTimeline.fromTo(".aboutPanel #teamDiv", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #teamSVG", 4, 
        {scale: 0.25, opacity: 0.25, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #teamText", 4, 
        {y: "50%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    );
    aboutTimeline.fromTo(".aboutPanel #mindsetDiv", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #mindsetSVG", 4, 
        {scale: 0.25, opacity: 0.25, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #mindsetText", 4, 
        {y: "50%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    );
    aboutTimeline.fromTo(".aboutPanel #robotDiv", 4, 
        {ease: Linear.easeNone}, 
        {x: "-100%", opacity: 0, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #iterationsDiv", 4, 
        {ease: Linear.easeNone}, 
        {y: "100%", opacity: 0, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #teamDiv", 4, 
        {ease: Linear.easeNone}, 
        {y: "100%", opacity: 0, ease: Linear.easeNone}
    ).fromTo(".aboutPanel #mindsetDiv", 4, 
        {ease: Linear.easeNone}, 
        {x: "100%", opacity: 0, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#divAbout",
        triggerHook: "onLeave",
        duration: 6000
    })
    .setPin("#divAbout")
    .setTween(aboutTimeline)
    .addTo(mController);
    /* *************************************** */

    // Info Timeline + Scene
    var infoTimeline = new TimelineMax();
    infoTimeline.fromTo("#infoSection #infoSection_01", 4, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#infoSection #infoText_01", 4, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#infoSection #infoSection_02", 4, 
        {x: "100%", ease: Linear.easeNone}, 
        {x: "0%", ease: Linear.easeNone}
    ).fromTo("#infoSection #infoText_02", 4, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("div#infoSection", 4, 
        {ease: Linear.easeNone}, 
        {x: "100%", opacity: 0, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#infoSection",
        triggerHook: "onLeave",
        duration: 3000
    })
    .setPin("#infoSection")
    .setTween(infoTimeline)
    .addTo(mController);
    /* *************************************** */

    // Work Timeline + Scene
    var workTimeline = new TimelineMax();
    workTimeline.fromTo("#workSection #workTitle", 4, 
        {scale: 0.25, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_01", 4, 
        {x: "50%", y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "50%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_01", 4, 
        {x: "50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_02", 4, 
        {x: "50%", y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "50%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_02", 4, 
        {x: "50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_03", 4, 
        {x: "50%", y: "100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "50%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #workCard_03", 4, 
        {x: "50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#workSection #svgBox_01", 4, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}, 
        {scale: 0.75, opacity: 0.5, ease: Linear.easeNone}
    ).fromTo("#workSection #svgBox_02", 4, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}, 
        {scale: 0.75, opacity: 0.5, ease: Linear.easeNone}
    ).fromTo("#workSection #svgBox_03", 4, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}, 
        {scale: 0.75, opacity: 0.5, ease: Linear.easeNone}
    ).fromTo("div#workSection", 4, 
        {ease: Linear.easeNone}, 
        {scale: 0, opacity: 0, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#workSection",
        triggerHook: "onLeave",
        duration: 3000
    })
    .setPin("#workSection")
    .setTween(workTimeline)
    .addTo(mController);
    /* *************************************** */

    // Team Timeline + Scene
    var teamTimeline = new TimelineMax();
    teamTimeline.fromTo("div#teamTitle", 4, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamTitle #teamText", 4, 
        {scale: 3, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo("div#teamTitle", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 0.25, ease: Linear.easeNone}
    );
    teamTimeline.fromTo("div#teamContent", 4, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamLogo", 4, 
        {x: "-100%", y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamLogo #logoIMG", 4, 
        {x: "-50%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_01", 4, 
        {x: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_02", 4, 
        {x: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_03", 4, 
        {x: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_04", 4, 
        {y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_05", 4, 
        {x: "-100%", y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_06", 4, 
        {x: "-100%", y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamBox_07", 4, 
        {x: "-100%", y: "-100%", opacity: 0, ease: Linear.easeNone}, 
        {x: "0%", y: "0%", opacity: 1, ease: Linear.easeNone}
    ).fromTo("#teamContent #teamLogo", 4, 
        {scale: 1, ease: Linear.easeNone}, 
        {x: "-100%", y: "-100%", scale: 0.25, opacity: 0, ease: Linear.easeNone}
    ).fromTo("#teamContent .teamBox", 4, 
        {ease: Linear.easeNone}, 
        {scale: 0.25, opacity: 0, ease: Linear.easeNone}
    ).fromTo("div#teamSection", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 0, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#teamSection",
        triggerHook: "onLeave",
        duration: 8000
    })
    .setPin("#teamSection")
    .setTween(teamTimeline)
    .addTo(mController);
    /* *************************************** */

    // Partners Timeline + Scene
    var partnersTimeline = new TimelineMax();
    partnersTimeline.fromTo("#partnersSection #partnersSection_01", 4, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#partnersSection #partnersText_01", 4, 
        {opacity: 0, ease: Linear.easeNone}, 
        {opacity: 1, ease: Linear.easeNone}
    ).fromTo("#partnersSection #partnersText_01", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 0, ease: Linear.easeNone}
    ).fromTo("div#infoSection", 4, 
        {ease: Linear.easeNone}, 
        {x: "100%", opacity: 0, ease: Linear.easeNone}
    ).fromTo("#partnersSection #divMap", 4, 
        {scale: 0.5, opacity: 0, ease: Linear.easeNone}, 
        {scale: 1, opacity: 1, ease: Linear.easeNone}
    ).fromTo("#partnersSection #divMap", 4, 
        {ease: Linear.easeNone}, 
        {scale: 0.5, opacity: 0, ease: Linear.easeNone}
    ).fromTo("#partnersSection #partnersSection_01", 4, 
        {ease: Linear.easeNone}, 
        {opacity: 0, ease: Linear.easeNone}
    );
    new ScrollMagic.Scene({
        triggerElement: "#partnersSection",
        triggerHook: "onLeave",
        duration: 4000
    })
    .setPin("#partnersSection")
    .setTween(partnersTimeline)
    .addTo(mController);
    /* *************************************** */
});

