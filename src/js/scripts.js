document.addEventListener("DOMContentLoaded", function () {
    var pictureButton = document.getElementById("btn-picture");
    var pictureFlipButton = document.getElementById("btn-picture-flip");
    var pictureGallery = document.getElementById('picture-gallery');

    var displayingFullGalleryPicture = false;
    var isPictureFlipped = false;

    function attachWebcam() {
        Webcam.set('constraints', {
            optional: [
                {
                    minWidth: 600
                }
        ]
        });
        Webcam.set({
            force_flash: false
        });
        Webcam.attach('#webcam');
    }

    attachWebcam();

    pictureButton.onclick = function () {
        Webcam.snap(function (data_uri) {
            var picture = document.createElement("img");
            picture.src = data_uri;
            picture.className = "gallery__picture";
            pictureGallery.appendChild(picture);
        });
    };

    pictureFlipButton.onclick = function () {
        isPictureFlipped = !isPictureFlipped;

        Webcam.reset();
        Webcam.set({
            flip_horiz: isPictureFlipped
        });
        attachWebcam();
    };

    pictureGallery.onclick = function (e) {
        if (e.target.nodeName === "IMG") {
            if (e.target.classList.contains("gallery__picture_full")) {
                e.target.classList.remove("gallery__picture_full");
                displayingFullGalleryPicture = false;
            } else if (!displayingFullGalleryPicture) {
                e.target.classList.add("gallery__picture_full");
                displayingFullGalleryPicture = true;
            }

        }
    }

});
