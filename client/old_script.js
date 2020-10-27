// function initPano() {
//     // Note: constructed panorama objects have visible: true
//     // set by default.
//     const panorama = new google.maps.StreetViewPanorama(
//       document.getElementById("map"), {
//         position: {
//           lat: 42.345573,
//           lng: -71.098326
//         },
//         addressControl: false,
//         zoomControl: false,
//         fullscreenControl: false,
//         linksControl: false,
//         panControl: false,
//         enableCloseButton: false,
//         motionTrackingControl: false
//       }
//     );
//   }


/*
 * Click the map to set a new location for the Street View camera.
 */
//let map;
let panorama;

function initMap() { }

function initMap2() {
    const coord = {
        lat: 50.08394,
        lng: 15.67348
    };
    const sv = new google.maps.StreetViewService();
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano"), {
        position: {
            lat: 42.345573,
            lng: -71.098326
        },
        addressControl: false,
        zoomControl: false,
        fullscreenControl: false,
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        motionTrackingControl: false
    }
    );
    // Set up the map.
    map = new google.maps.Map(document.getElementById("map"), {
        center: coord,
        zoom: 16,
        streetViewControl: false,
    });
    // Set the initial Street View camera to the center of the map
    sv.getPanorama({
        location: coord,
        radius: 200
    }, processSVData);
    // Look for a nearby Street View panorama when the map is clicked.
    // getPanorama will return the nearest pano when the given
    // radius is 50 meters or less.
    /*map.addListener("click", (event) => {
      sv.getPanorama({ location: event.latLng, radius: 200 }, processSVData);
    });*/

    addPanoListeners();

}

function processSVData(data, status) {
    if (status === "OK") {
        const location = data.location;

        panorama.setPano(location.pano);
        panorama.setPov({
            heading: Math.floor(Math.random() * 361), //0 - 360
            pitch: -10,
        });
        panorama.setVisible(true);

        //vytvoří marker s uloženým panoID
        const marker = new google.maps.Marker({
            position: location.latLng,
            map,
            title: location.description,
        });

    } else {
        console.error("Street View data not found for this location.");
    }
}

var iPanoId = $('#input-pano-id');
var iPos = $('#input-position');
var iHeading = $('#input-heading');
var iPitch = $('#input-pitch');

function addPanoListeners() {
    if (panorama) {
        panorama.addListener("pano_changed", () => {
            iPanoId.val(panorama.getPano());
        });
        panorama.addListener("links_changed", () => {
            const links = panorama.getLinks();
            console.log('NEW LINKS:')
            console.log(links);
        });
        panorama.addListener("position_changed", () => {
            iPos.val(panorama.getPosition());
        });
        panorama.addListener("pov_changed", () => {
            iHeading.val(panorama.getPov().heading);
            iPitch.val(panorama.getPov().pitch);
        });
    }

}


/*SCREEN CAPTURE*/
async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch (err) {
        console.error("Error: " + err);
    }
    return captureStream;
}

async function screenCapture() {
    const video = $('#video')[0];
    const canvas = $('#canvas')[0];
    const context = canvas.getContext('2d');

    const displayMediaOptions = {
        video: {
            cursor: "never"
        },
        audio: false
    }

    video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

    const videoTrack = video.srcObject.getVideoTracks()[0];
    const { height, width } = videoTrack.getSettings();

    context.drawImage(video, 0, 0, width, height);
    return context.getImageData(0, 0, width, height);
}

