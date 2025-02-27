const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');
let selectedCube = null;
let offsetX, offsetY;

cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
        selectedCube = cube;
        offsetX = e.clientX - cube.getBoundingClientRect().left;
        offsetY = e.clientY - cube.getBoundingClientRect().top;
        cube.style.transition = 'none'; // Disable transition during drag
    });
});

document.addEventListener('mousemove', (e) => {
    if (selectedCube) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Get container boundaries
        const containerRect = container.getBoundingClientRect();
        const cubeRect = selectedCube.getBoundingClientRect();

        // Constrain the cube within the container
        if (newX < containerRect.left) newX = containerRect.left;
        if (newX + cubeRect.width > containerRect.right) newX = containerRect.right - cubeRect.width;
        if (newY < containerRect.top) newY = containerRect.top;
        if (newY + cubeRect.height > containerRect.bottom) newY = containerRect.bottom - cubeRect.height;

        selectedCube.style.position = 'absolute';
        selectedCube.style.left = `${newX}px`;
        selectedCube.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    if (selectedCube) {
        selectedCube.style.transition = 'background-color 0.3s'; // Re-enable transition
        selectedCube = null; // Deselect the cube
    }
});
