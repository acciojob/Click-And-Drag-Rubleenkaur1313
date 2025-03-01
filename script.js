const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');
let selectedCube = null;
let offsetX, offsetY;

cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
        selectedCube = cube;
        offsetX = e.clientX - cube.getBoundingClientRect().left;
        offsetY = e.clientY - cube.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
    });
});

document.addEventListener('mouseup', () => {
    if (selectedCube) {
        document.removeEventListener('mousemove', onMouseMove);
        selectedCube = null;
    }
});

function onMouseMove(e) {
    if (!selectedCube) return;

    const containerRect = container.getBoundingClientRect();
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Boundary conditions
    if (newX < containerRect.left) newX = containerRect.left;
    if (newX + selectedCube.offsetWidth > containerRect.right) {
        newX = containerRect.right - selectedCube.offsetWidth;
    }
    if (newY < containerRect.top) newY = containerRect.top;
    if (newY + selectedCube.offsetHeight > containerRect.bottom) {
        newY = containerRect.bottom - selectedCube.offsetHeight;
    }

    selectedCube.style.position = 'absolute';
    selectedCube.style.left = `${newX - containerRect.left}px`;
    selectedCube.style.top = `${newY - containerRect.top}px`;
}