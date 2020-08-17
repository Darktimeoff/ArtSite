const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, _preventDefaults, false);
        });
    });

    function _preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function _highLight(item) {
        const $fileUpload = item.closest('.file_upload');
        $fileUpload.style.border = '5px solid yellow';
        $fileUpload.style.backgroundColor = "rgba(0, 0, 0, .7)"

    }

    function _unHighLight(item) {
        const $fileUpload = item.closest('.file_upload');
        $fileUpload.style.border = '';
        $fileUpload.style.backgroundColor = '';
    }

    ['dragenter','dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => _highLight(input), false)
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => _unHighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            const button = input.closest('.file_upload').querySelector('button');
            input.files = e.dataTransfer.files;
            button.textContent = _checkAndCutName(input.files[0].name);
        });
    })

    function _checkAndCutName(name) {
        return name.length < 10 ? name : name.slice(0, 10) + '...';
    }
}

export default drop;