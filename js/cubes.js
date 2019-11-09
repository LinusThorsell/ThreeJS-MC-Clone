var loader = new THREE.TextureLoader();

noise.seed(Math.random());
let div = 100;
let weight = 5;
let heightdecrese = 10;
let expo = 1.3;

let chunksize = 16;
let worldheight = 30;

loader.setPath('res/');
var texture0 = loader.load( 'side.png' );
var texture1 = loader.load( 'side.png' );
var texture2 = loader.load( 'top.png' );
var texture3 = loader.load( 'bottom.png' );
var texture4 = loader.load( 'side.png' );
var texture5 = loader.load( 'side.png' );

var material = [
    new THREE.MeshBasicMaterial( { map: texture0 } ),
    new THREE.MeshBasicMaterial( { map: texture1 } ),
    new THREE.MeshBasicMaterial( { map: texture2 } ),
    new THREE.MeshBasicMaterial( { map: texture3 } ),
    new THREE.MeshBasicMaterial( { map: texture4 } ),
    new THREE.MeshBasicMaterial( { map: texture5 } )
];

function getChunks(xSize, zSize) {
    var chunks = [];
    for(let x = 0; x < xSize; x++) {
        for(let z = 0; z < zSize; z++) {
            chunks.push(new chunk(x, z))
        }
    }
    return chunks;
}

class chunk {
    constructor(ChunkX, ChunkZ) {
        this.cubes = [];

        for (let x = 0; x < chunksize; x++) {
            for (let y = 0; y < worldheight; y++) {
                for (let z = 0; z < chunksize; z++) {
                    let val = Math.abs(noise.perlin3((x + ChunkX * chunksize + 630000)/div, y/div, (z + ChunkZ * chunksize)/div)) * 256;
                    if (val > weight +  Math.pow(expo,y)/heightdecrese) {
                        this.cubes.push(new cube(x + ChunkX * chunksize, y, z + ChunkZ * chunksize, material));
                        console.log("Created block at: x=", x + ChunkX * chunksize, " z= ",z + ChunkZ * chunksize);
                    }
                }
            }
        }
    }
    getLocalBlocks() {
        return this.cubes;
    }
    ToString() {
        return "REEEE";
    }
}

class cube {
    constructor(x, y, z, material) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.geometry = new THREE.CubeGeometry(1, 1, 1);
        this.material = material;
    }

    getMesh() {
        var mesh = new THREE.Mesh(this.geometry, this.material);
        mesh.position.x = this.x;
        mesh.position.y = this.y;
        mesh.position.z = this.z;
        return mesh;
    }
    getGeometry() {
        return this.geometry;
    }
}