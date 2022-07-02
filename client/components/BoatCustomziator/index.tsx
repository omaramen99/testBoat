import { useEffect, useRef, useState } from "react";
import { Menu } from "react-feather";
import Sketch, { Config } from "./Sketch";


import EnginesAnimationCustomizator from "./UI/EnginesAnimationCustomizator"

import style from "./style.module.scss";
import StyleCustomizator from "./UI/StyleCustomizator";
import VisibilityCustomizator from "./UI/VisibilityCustomizator";

export interface BoatCustomizatorConfig {
  config: Config;
}
class CustomizationProps {
  public static HullType : string = "deeb_vee";
  public static TransomType : string = "full"; 
  public static SetBack : string = "211919";
  public static HullTypeString : string = "Deeb Vee";
  public static TransomTypeString : string = "Full"; 
  public static SetBackString : string = "211919"; 
}
export default function BoatCustomizator({ config }: BoatCustomizatorConfig) {
  const [activePlaceholder, setActivePlaceholder] = useState<string | null>(
    null
  );

  const parentRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<Sketch>();

  const [hullType, setHullType] = useState<string | null>("Deeb Vee");
  const [transomType, setTransomType] = useState<string | null>("FULL");
  const [setBack, setSetBack] = useState<string | null>("211919");

  useEffect(() => {
    // const Sketch = require("./Sketch") as typeof _Sketch;
    const sketch = new Sketch(parentRef.current, config);
    /**
     * Update component state when any placeholder gets clicked
     */
    sketch.addEventListener("placeholderClick", ({ placeholderKey }) =>
      setActivePlaceholder(placeholderKey)
    );

    sketchRef.current = sketch;

    return () => sketch.dispose();
  }, []);


  var SetHull = (hullType,hullTypeString)=>
  {
    CustomizationProps.HullType = hullType;
    CustomizationProps.HullTypeString = hullTypeString;
  }
  var SetTransom = (transomType,transomTypeString)=>
  {
    CustomizationProps.TransomType = transomType;
    CustomizationProps.TransomTypeString = transomTypeString;
  }
  var SetSetBack = (setBack,setBackString)=>
  {
    CustomizationProps.SetBack = setBack;
    CustomizationProps.SetBackString = setBackString;
  }
  var UpdateBoat = ()=>
  {
    if (CustomizationProps.HullType == "catamaran" && CustomizationProps.TransomType == "full") {
      sketchRef.current?.boat.setVisibilityCustomizationOption_New([new RegExp(`${CustomizationProps.HullType}_${CustomizationProps.SetBack}`)])
      setHullType(CustomizationProps.HullTypeString);
      setTransomType(CustomizationProps.TransomTypeString);
      setSetBack(CustomizationProps.SetBackString);
    }else
    {
      sketchRef.current?.boat.setVisibilityCustomizationOption_New([new RegExp(`${CustomizationProps.HullType}_${CustomizationProps.TransomType}_${CustomizationProps.SetBack}`)])
      setHullType(CustomizationProps.HullTypeString);
      setTransomType(CustomizationProps.TransomTypeString);
      setSetBack(CustomizationProps.SetBackString);
    }
  }


  return (
<div className={style.PAGE}>

  {/* <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Logo</a>
    </div>
  </nav> */}

  <div className={`container-fluid ${style.PageContainer}`}>

<div className={`${style.UiControlLayer} ${style.noselect}`}>
  <div className="container-fluid">
      <div className={`row ${style.navCont}`}>
        <div className={`col-9`}><span className={style.PageHeaderTytle}>Porta Bracket</span></div>
        <div className={`col-3`}><span className={style.PageHeaderHelpCont}><span className={style.PageHeaderHelp}>HELP</span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg></span> </div>
      </div>
      <div className={`${style.HorzSep} row`}></div>
      <div className="row">
        <div className="col-4">
          <div className="row"><span className={style.BracketInfoTitle}>{setBack}</span></div>
          <div className="row">
            <div className="col-12">

            <div  className={style.BracketInfoLine}>Set-Back: 17"</div>
            </div>
            <div className="col-12">
            <div className={style.BracketInfoLine}>Vertical Lift: 12"</div>

            </div>
            <div className="col-12">

            <div className={style.BracketInfoLine}>Max HP: 300</div>
            </div>
            <div className="col-12">

            <div className={style.BracketInfoLine}>Required Width: 15"</div>
            </div>
            
            
            
            
          </div>
          </div>
        <div className="col-8">
          <div className={`row ${style.DropDownsContainer}`}>
            
            <div className={style.DropDownCont}>
            <div className={`${style.noselect} ${style.DropDowns} dropdown`}>
              <div className={`${style.dropDownContainer}  dropdown-toggle`}data-bs-toggle="dropdown">
                <div className={style.dropDownHeader}>HULL TYPE</div>
                <div  className={`${style.dropDownTitle}`}><span className={style.dropDownTitleString}>{hullType}</span><span className={style.dropDownArrow}><i className={`fa-solid fa-chevron-down`}></i></span>
               </div>
              </div>
               <ul className="dropdown-menu">
            <li><a className={`${style.selectionButtonActive} dropdown-item ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetHull("deeb_vee","Deeb Vee"); UpdateBoat(); }}>Deeb Vee</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item activee ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetHull("flat","Flat"); UpdateBoat(); }}>Flat</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item disabledd ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetHull("catamaran","Catamaran"); UpdateBoat(); }}>Catamaran</a></li>
          </ul>
        </div>
      </div>
            
            
            <div className={style.DropDownCont}>
            <div className={`${style.noselect} ${style.DropDowns} dropdown`}>
              <div className={`${style.dropDownContainer}  dropdown-toggle`}data-bs-toggle="dropdown">
                <div className={style.dropDownHeader}>TRANSOM TYPE</div>
                <div  className={`${style.dropDownTitle}`}><span className={style.dropDownTitleString}>{transomType}</span><span className={style.dropDownArrow}><i className={`fa-solid fa-chevron-down`}></i></span>
               </div>
              </div>
               <ul className="dropdown-menu">
            <li><a className={`${style.selectionButtonActive} dropdown-item ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetTransom("notched","Notched"); UpdateBoat(); }}>Notched</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item activee ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetTransom("full","Full"); UpdateBoat(); }}>Full</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item disabledd ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetTransom("rubrail","Rubrail"); UpdateBoat(); }}>Rubrail</a></li>
          </ul>
        </div>
      </div>
            
           
            <div className={style.DropDownCont}>
            <div className={`${style.noselect} ${style.DropDowns} dropdown`}>
              <div className={`${style.dropDownContainer}  dropdown-toggle`}data-bs-toggle="dropdown">
                <div className={style.dropDownHeader}>SET BACK</div>
                <div  className={`${style.dropDownTitle}`}><span className={style.dropDownTitleString}>{setBack}</span><span className={style.dropDownArrow}><i className={`fa-solid fa-chevron-down`}></i></span>
               </div>
              </div>
               <ul className="dropdown-menu">
            <li><a className={`${style.selectionButtonActive} dropdown-item ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetSetBack("171915","171915"); UpdateBoat(); }}>171915</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item activee ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault();   SetSetBack("211919","211919"); UpdateBoat(); }}>211919</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item disabledd ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetSetBack("211950","211950"); UpdateBoat(); }}>211950</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item disabledd ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetSetBack("261919","261919"); UpdateBoat(); }}>261919</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item disabledd ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetSetBack("R81618","R81618"); UpdateBoat(); }}>R81618</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item disabledd ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetSetBack("R121922","R121922"); UpdateBoat(); }}>R121922</a></li>
            <li><a className={`${style.selectionButtonActive} dropdown-item disabledd ${style.dropdownItem}`} draggable="false" href="#" onClick={(e)=>{e.preventDefault(); SetSetBack("171919","171919"); UpdateBoat(); }}>171919</a></li> 

          </ul>
        </div>
      </div>
            
          </div>
        </div>
      </div>
      <div className={style.test}>
        <EnginesAnimationCustomizator title={'Engine Pose'}/>
      </div>


  </div>

</div>



    <div className={style.canvasContainer} ref={parentRef}></div>

    <div className={style.boatCustomizationLayer}>


      <div className={style.test}>
        <EnginesAnimationCustomizator title={'Engine Pose'}/>
      </div>
      
    </div>
  </div> 

</div>
    // <div className={style.container}>
    //   <div className={style.headerContainer}>
    //     <div className={style.headerTitle}>Company Name</div>
    //     <Menu className={style.headerIcon} />
    //   </div>
    //   <div className={style.canvasContainer} ref={parentRef}></div>
    //   {/**
    //    * Show Placeholder configuration
    //    */}
    //   {activePlaceholder && (
    //     <div className={style.customizationContainer}>
    //       <div className={style.customizationHeader}>
    //         <div
    //           className={style.title}
    //         >{`Edit ${config.customization[activePlaceholder].placeholderLabel}`}</div>
    //         <button>Done</button>
    //       </div>

    //       {/**
    //        * Show Visibility customizator if any
    //        */}
    //       {activePlaceholder &&
    //         config.customization[
    //           activePlaceholder
    //         ].visibilityCustomization?.map((customization, index) => (
    //           <VisibilityCustomizator
    //             key={index}
    //             customization={customization}
    //             /**
    //              * Update Boat with selected customization option
    //              */
    //             onSelect={(option) =>
    //               sketchRef.current?.boat.setVisibilityCustomizationOption( 
    //                 customization,
    //                 option
    //               )
    //             }
    //           />
    //         ))}
    ////////////////////
    //{activePlaceholder &&
    //  config.customization[
    //    activePlaceholder
    //  ].visibilityCustomization?.map((customization, index) => (
    //    <VisibilityCustomizator
    //      key={index}
    //      customization={customization}
    //      /**
    //       * Update Boat with selected customization option
    //       */
    //      onSelect={(option) =>
    //        sketchRef.current?.boat.setVisibilityCustomizationOption_New(
    //          option.targetParts
    //        )
    //      }
    //    />
    //  ))} 
    //       {/**
    //        * Show Style customizator if any
    //        */}
    //       {activePlaceholder &&
    //         config.customization[activePlaceholder].styleCustomization?.map(
    //           (customization, index) => (
    //             <StyleCustomizator
    //               key={index}
    //               customization={customization}
    //               /**
    //                * Update Boat with selected customization option option
    //                */
    //               onSelect={(option) =>
    //                 sketchRef.current?.boat.setStyleCustomizationOption(
    //                   customization,
    //                   option
    //                 )
    //               }
    //             />
    //           )
    //         )}


    //        {/**
    //        * Show Animation Buttons if the activePlaceholder is Engine
    //        */}
    //       {activePlaceholder == "placeholder_engine"? (<EnginesAnimationCustomizator title={'Engine Pose'}/>):("")}



    //     </div>
    //   )}
    // </div>
  );
}
