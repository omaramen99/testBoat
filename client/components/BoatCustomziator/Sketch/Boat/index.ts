import * as THREE from "three";
import { GLTF } from "../GLTFLoader";

import { Utils } from "../Utils";
import CustomizationManager, {
  CustomizationConfig,
  PartSearchOptions,
  StyleCustomization,
  VisibilityCustomization,
} from "./CustomizationManager";
import Material from "./CustomizationManager/Material";

import Placeholder from "./Placeholder";
export type BoatTextures = {
  [key in "map" | "occlusionRoughnessMetallicMap"]: THREE.Texture;
};

export type Part = THREE.Mesh<THREE.BufferGeometry, Material>;

export type { CustomizationConfig };

export default class Boat extends THREE.Group {
  size: THREE.Vector3;
  boundingBox: THREE.Box3;
  parts: Part[];
  center: THREE.Vector3;

  private placeholders: Placeholder[] = [];
  customizationManager: CustomizationManager;

  constructor(
    boatGLTF: GLTF,
    private textures: BoatTextures,
    private readonly customizationConfig: CustomizationConfig
  ) {
    super();
    /**
     * Prepare Textures & Populate Boat with parts and placeholders
     */
   
    
    this.prepareTextures().addParts(boatGLTF).addPlaceholders(boatGLTF);

    /**
     * Cretae Customization manager
     */
    this.customizationManager = new CustomizationManager(
      this,
      this.customizationConfig
    );
  }

  private addParts(gltf: GLTF) {
    /**
     * Since Parts might be deeply nested, we need to unwrap them to avoid additional deep matrix calculations
     */
    this.parts = [];

    /**
     * tone texture for the new added parts
     */
    const threeTone = new THREE.TextureLoader().load('./threeTone.jpg')
    threeTone.minFilter = THREE.NearestFilter;
    threeTone.magFilter = THREE.NearestFilter;


    const fiveTone = new THREE.TextureLoader().load('./fiveTone.jpg')
    fiveTone.minFilter = THREE.NearestFilter;
    fiveTone.magFilter = THREE.NearestFilter;
    
    gltf.scene.traverse((object) => {

      /**
       * If object is mesh then it's one of boat's part
       */
      if (object.type == "Mesh") {
        /**
         * Create separate material for each part to handle separate color change
         */
         //if (kk.includes(object.name)) {
           if (object.name == "engine" || object.name == "deck_ex" || object.name.includes("bracket") ) {
            /**
            * new added parts
            */

             (object as THREE.Mesh).material = new THREE.MeshToonMaterial({
               color : new THREE.Color(150,150,150),
               gradientMap: fiveTone,
               side: THREE.DoubleSide
             });

             this.parts.push(object as any);
           } else if(object.name == "soft_top"|| object.name == "soft_top_pipework")
           {
            //console.log(object);
            /**
            * soft top fixer
            */

             (object as THREE.Mesh).material = new THREE.MeshToonMaterial({
               color : new THREE.Color(50,50,50),
               gradientMap: threeTone,
               side: THREE.DoubleSide
             });
             this.parts.push(object as any);
   
           } else if(object.name.includes("deeb_vee_notched")|| object.name.includes("deeb_vee_full")|| object.name.includes("deeb_vee_rubrail")|| object.name.includes("flat_full")|| object.name.includes("flat_rubrail"))
           {
        
            /**
            * soft top fixer
            */

              (object as THREE.Mesh).material = new THREE.MeshToonMaterial({
                color : new THREE.Color(100,100,100),
                gradientMap: fiveTone,
                side: THREE.DoubleSide
              });
            
             this.parts.push(object as any);
   
           }
           else {
            /**
            * old parts with old textures
            */
            //  (object as THREE.Mesh).material = new Material({
            //    colorMap: this.textures.map,
            //    occlusionRoughnessMetallicMap:
            //      this.textures.occlusionRoughnessMetallicMap,
            //    opacity: this.customizationConfig.transparentParts[object.name] || 1,
            //  });
     
            //  this.parts.push(object as any);













             (object as THREE.Mesh).material = new THREE.MeshToonMaterial({
              color : new THREE.Color(100,100,100),
              gradientMap: fiveTone,
              side: THREE.DoubleSide
            });
          
           this.parts.push(object as any);
             
           }


         
      }
    });
    this.add(...this.parts);

    /**
     * Calculate boat's overall size and center
     */
    this.boundingBox = new THREE.Box3().setFromObject(this);

    this.size = this.boundingBox.getSize(new THREE.Vector3());
    this.center = this.boundingBox.getCenter(new THREE.Vector3());

    /**
     * Scale it down to fit in circle with radius of 1
     */
    const scale = 2 / Math.hypot(...this.size.toArray());
    this.scale.setScalar(scale);

    return this;
  }

  private addPlaceholders(gltf: GLTF) {
    gltf.scene.traverse((object) => {
      /**
       * If object is simple Object3D/null object then it's placeholder
       */
      if (object.type == "Object3D") {
        /**
         * Check if there exists placeholder in config with current name
         */
        
        const config = this.customizationConfig.customization[object.name];

        
        
        
        
        if (!config) return;
        /**
         * Create placeholder
         */
        const placeholder = new Placeholder(
          object.name,
          config.placeholderLabel
        ).setPosition(object.position);

        /**
         * Emit boat's event on placeholder click
         */
        placeholder.addEventListener("click", () =>{
          
          this.dispatchEvent({
            type: "placeholderClick",
            placeholderKey: object.name,
          })
        }
        );

        this.placeholders.push(placeholder);
      }
    });
    if (this.placeholders.length) this.add(...this.placeholders);
    return this;
  }

  private prepareTextures() {
    Object.values(this.textures).forEach((texture: THREE.Texture) => {
      texture.flipY = false;
      texture.generateMipmaps = false;
    });
    return this;
  }

  /**
   * Searchs and returns part with matching partName if any
   * @param partName string
   * @returns Part
   */
  getPartByName(partName: string) {
    return this.parts.find((part) => part.name == partName) as Part;
  }

  /**
   * Calls callback for each part, passing it as an argument along with it's name
   */
  forEachPart(callback: (part: THREE.Mesh, partName: string) => void): void {
    this.parts.forEach((part) => callback(part as THREE.Mesh, part.name));
  }

  /**
   * Calls callback for each placeholder, passing it as an argument
   */
  forEachPlaceholder(callback: (placeholder: Placeholder) => void): void {
    this.placeholders.forEach((placeholder) => callback(placeholder));
  }

  /**
   * Returns parts which names match with searchOptions (string or regex)
   */
  getMatchingParts(searchOptions: PartSearchOptions) {
    return this.parts.filter((part) =>
      searchOptions.some((option) =>
        typeof option == "string"
          ? part.name == option
          : !!part.name.match(option)
      )
    );
  }

  /**
   * Shorthand for calling CustomizationManager.setVisibilityOption
   */
  setVisibilityCustomizationOption(
    customization: VisibilityCustomization,
    option: VisibilityCustomization["options"][number]
  ) {
    this.customizationManager.setVisibilityOption(customization, option);
  }
  setVisibilityCustomizationOption_New(
    option
  ) {
    this.customizationManager.setVisibilityOption_New(option);
  }
  /**
   * Shorthand for calling CustomizationManager.setStyleOption
   */
  setStyleCustomizationOption(
    customization: StyleCustomization,
    option: StyleCustomization["options"][number]
  ) {
    this.customizationManager.setStyleOption(customization, option);
  }

  /**
   * Dispose used resources
   */
  dispose() {
    this.forEachPart((part) => {
      part.geometry.dispose();
      (part.material as THREE.Material).dispose();
    });
    this.forEachPlaceholder((placeholder) => placeholder.dispose());
  }
}
