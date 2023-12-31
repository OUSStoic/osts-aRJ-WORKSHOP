
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'X';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                // decomment the following and add coordinates:
                lat: 35.6186768,
                lng: -5.2753539,
            },
        },
    ];
}

var models = [
    {
        url: './assets/wumpus/scene.gltf',
        scale: '1 1 1',
        info: 'wumpus, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/miky/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'miky, Lv. 80, HP 100/100',
    },
    {
        url: './assets/luffy/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'luffy, Lv. 99, HP 150/150',
    },
    {
        url: './assets/20dh/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: '20dh, Lv. 999, HP 999/999',
    },
    {
        url: './assets/lantern/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'lantern, Lv. 999, HP 999/999',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
