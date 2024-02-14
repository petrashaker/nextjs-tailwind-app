import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { AresUploadBtnProps } from "../../../../../types/componentPropTypes";
import { StateType } from "../../../../../utils/constants";
import { setAresData, setState } from "@/lib/features/ares/aresSlice";
import { useTranslation } from "@/app/i18/client";

const AresButton = ( props: AresUploadBtnProps ) => {
  const { t } = useTranslation(props.lng, 'auth')
  const dispatch = useAppDispatch()
  const aresData = useAppSelector(state => state.aresData)
  const fetchData = (query: string, id: string) => {
    const requestBody = 
    id === "personalIdNumber" ? 
      { ico: [query], start: 0, pocet: 10, razeni: [] }
      :
      { obchodniJmeno: decodeURI(query), start: 0, pocet: 10, razeni: [] };

    dispatch(setState(StateType.LOADING));
    return fetch("/api/AresSubmit", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
  }

  const submitAresEnquiryForm =  () => {
    dispatch(setState(StateType.LOADING));
    try {
      fetchData(encodeURIComponent(props.query), props.id)
      .then(async (res: Response) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const r = await res.json();
        const data = JSON.parse(r)
        const isError = data.kod === "NENALEZENO" || data.kod === "OBECNA_CHYBA" || data.kod === "CHYBA_VSTUPU";
        if(isError) {
          // if more companies from ARES are available show warning
          if(data.subKod === "VYSTUP_PRILIS_MNOHO_VYSLEDKU") {
            dispatch(setState(StateType.WARN)); 
            // showDialog(true);
          } else {
            // if the provided company doesn't exist show error
            dispatch(setState(StateType.ERROR)); 
            // showDialog(true);  
          }
        } else if(data.pocetCelkem === 0) {
          // if the provided company was not found show error
          dispatch(setState(StateType.ERROR)); 
          // showDialog(true);
        } else if(data.pocetCelkem > 1) {
          // if more companies from ARES are available show warning
          dispatch(setState(StateType.WARN)); 
          // showDialog(true);
        } else {
          const incomingData = parseDataFromAres(data.ekonomickeSubjekty[0]);
          dispatch(setAresData(incomingData));
        } 
      });
    } catch(error: any) {
      dispatch(setState(StateType.ERROR));
      // console.error(t("registration:ares.error.message"), error.message);
      // alert(t("registration:ares.error.alert"));    
    }
  };

  const handleClick = () => {
    if (aresData.state === StateType.LOADING) {
      return;
    } else {
      submitAresEnquiryForm();
    }
  };

  const uploadedAresData = {
    companyName: "",
    street: "",
    streetNumber: "",
    city: "",
    postalCode: "",
    personalIdNumber: "",
    vatIdNumber: ""
  };

  const parseDataFromAres = (data: any) => {
    const parsedData = { ...uploadedAresData };

    const nazevUliceExists =  data.sidlo.hasOwnProperty("nazevUlice");
    const cisloOrientacniExists =  data.sidlo.hasOwnProperty("cisloOrientacni");
    const cisloOrientacniPismenoExists = data.sidlo.hasOwnProperty("cisloOrientacniPismeno");
    const nazevCastiObceExists = data.sidlo.hasOwnProperty("nazevCastiObce");
    
    parsedData.personalIdNumber = data.ico;
    parsedData.vatIdNumber = data.dic;
    parsedData.companyName = data.obchodniJmeno;
    parsedData.street = nazevUliceExists ? data.sidlo.nazevUlice : data.sidlo.nazevObce;
    parsedData.streetNumber = 
      cisloOrientacniPismenoExists ? 
        `${data.sidlo.cisloDomovni}/${data.sidlo.cisloOrientacni}${data.sidlo.cisloOrientacniPismeno}` 
          : 
          cisloOrientacniExists ? 
            `${data.sidlo.cisloDomovni}/${data.sidlo.cisloOrientacni}`
            : data.sidlo.cisloDomovni;
    parsedData.city = nazevCastiObceExists && (!data.sidlo.nazevObce.includes(data.sidlo.nazevCastiObce)) ? `${data.sidlo.nazevObce} - ${data.sidlo.nazevCastiObce}` : data.sidlo.nazevObce;
    parsedData.postalCode = data.sidlo.psc;
    
    return parsedData;
  };

  const buttonClassCommon = " w-80 text-sm border-2 py-1.5 px-2.5 rounded-md"
  return(
    <button 
      type="button" 
      className={
        `${props.isDisabled ? 
          "bg-cyan-600 border-cyan-600  hover:bg-cyan-300 hover:border-cyan-300" + buttonClassCommon
          : 
          "bg-cyan-50 border-cyan-50 text-gray-300 hover:bg-cyan-50 hover:border-cyan-50 cursor-not-allowed" + buttonClassCommon
        }`
      }
      onClick={ handleClick }
      >
      { t('button.ares') }
    </button>
  )
}

export default AresButton;