import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@flow';
import { fieldsToClasses } from './betsClasses';

export const Roulette = () => {

  const dispatch = useDispatch();
  //active selection
  const { setBet } = useSelector(state => state.user);

  const setField = (newField) => {
    if (setBet.field !== newField) {
      dispatch(userActions.setActField(newField));
    }
  }

  return (
    <div className="roulette">
      <div className="playground">
        <div className="schema">
          <table className={`${fieldsToClasses[setBet.field]}`}>
            <tbody>
              <tr className="sel-row">
                <td className="sel id-1-1"></td>
                <td className="pau wing id-1-2" colSpan="3"></td>
                <td className="sel id-1-3"><span onClick={() => setField('num000123')}/></td>
                <td className="pau id-1-4"></td>
                <td className="sel id-1-5"><span onClick={() => setField('str13')}/></td>
                <td className="pau id-1-6"></td>

                <td className="sel id-1-7"><span onClick={() => setField('line16')}/></td>
                <td className="pau id-1-8"></td>
                <td className="sel id-1-9"><span onClick={() => setField('str46')}/></td>
                <td className="pau id-1-10"></td>

                <td className="sel id-1-11"><span onClick={() => setField('line49')}/></td>
                <td className="pau id-1-12"></td>
                <td className="sel id-1-13"><span onClick={() => setField('str79')}/></td>
                <td className="pau id-1-14"></td>

                <td className="sel id-1-15"><span onClick={() => setField('line712')}/></td>
                <td className="pau id-1-16"></td>
                <td className="sel id-1-17"><span onClick={() => setField('str1012')}/></td>
                <td className="pau id-1-18"></td>

                <td className="sel id-1-19"><span onClick={() => setField('line1015')}/></td>
                <td className="pau id-1-20"></td>
                <td className="sel id-1-21"><span onClick={() => setField('str1315')}/></td>
                <td className="pau id-1-22"></td>

                <td className="sel id-1-23"><span onClick={() => setField('line1318')}/></td>
                <td className="pau id-1-24"></td>
                <td className="sel id-1-25"><span onClick={() => setField('str1618')}/></td>
                <td className="pau id-1-26"></td>

                <td className="sel id-1-27"><span onClick={() => setField('line1621')}/></td>
                <td className="pau id-1-28"></td>
                <td className="sel id-1-29"><span onClick={() => setField('str1921')}/></td>
                <td className="pau id-1-30"></td>

                <td className="sel id-1-31"><span onClick={() => setField('line1924')}/></td>
                <td className="pau id-1-32"></td>
                <td className="sel id-1-33"><span onClick={() => setField('str2224')}/></td>
                <td className="pau id-1-34"></td>

                <td className="sel id-1-35"><span onClick={() => setField('line2227')}/></td>
                <td className="pau id-1-36"></td>
                <td className="sel id-1-37"><span onClick={() => setField('str2527')}/></td>
                <td className="pau id-1-38"></td>

                <td className="sel id-1-39"><span onClick={() => setField('line2530')}/></td>
                <td className="pau id-1-40"></td>
                <td className="sel id-1-41"><span onClick={() => setField('str2830')}/></td>
                <td className="pau id-1-42"></td>

                <td className="sel id-1-43"><span onClick={() => setField('line2833')}/></td>
                <td className="pau id-1-44"></td>
                <td className="sel id-1-45"><span onClick={() => setField('str3133')}/></td>
                <td className="pau id-1-46"></td>

                <td className="sel id-1-47"><span onClick={() => setField('line3136')}/></td>
                <td className="pau id-1-48"></td>
                <td className="sel id-1-49"><span onClick={() => setField('str3436')}/></td>
                <td className="pau id-1-50"></td>     

                <td className="sel id-1-51"></td>
                <td className="pau wing id-1-52"></td>  
                <td className="sel id-1-53"></td>           
              </tr>

              <tr className="values values-1">
                <td className="pau id-2-1" rowSpan="7"></td>
                <td className="zero wing num-00" colSpan="3" rowSpan="7" onClick={() => setField('num00')}><div className="wing"></div></td>
                <td className="pau id-2-2"></td>
                <td className="num num-03" colSpan="3" rowSpan="3" onClick={() => setField('num3')}></td>
                <td className="pau id-2-3"></td>
                <td className="num num-06" colSpan="3" rowSpan="3" onClick={() => setField('num6')}></td>
                <td className="pau id-2-4"></td>
                <td className="num num-09" colSpan="3" rowSpan="3" onClick={() => setField('num9')}></td>
                <td className="pau id-2-5"></td>
                <td className="num num-12" colSpan="3" rowSpan="3" onClick={() => setField('num12')}></td>
                <td className="pau id-2-6"></td>
                <td className="num num-15" colSpan="3" rowSpan="3" onClick={() => setField('num15')}></td>
                <td className="pau id-2-7"></td>
                <td className="num num-18" colSpan="3" rowSpan="3" onClick={() => setField('num18')}></td>
                <td className="pau id-2-8"></td>
                <td className="num num-21" colSpan="3" rowSpan="3" onClick={() => setField('num21')}></td>
                <td className="pau id-2-9"></td>
                <td className="num num-24" colSpan="3" rowSpan="3" onClick={() => setField('num24')}></td>
                <td className="pau id-2-10"></td>
                <td className="num num-27" colSpan="3" rowSpan="3" onClick={() => setField('num27')}></td>
                <td className="pau id-2-11"></td>
                <td className="num num-30" colSpan="3" rowSpan="3" onClick={() => setField('num30')}></td>
                <td className="pau id-2-12"></td>
                <td className="num num-33" colSpan="3" rowSpan="3" onClick={() => setField('num33')}></td>
                <td className="pau id-2-13"></td>
                <td className="num num-36" colSpan="3" rowSpan="3" onClick={() => setField('num36')}></td>
                <td className="pau id-2-14" rowSpan="3"></td>
                <td className="wing id-2-15 col-2-1" rowSpan="3" onClick={() => setField('col3')}><div className="wing"></div></td>
                <td className="pau id-2-16" rowSpan="3"></td>
              </tr>

              <tr className="sel-col">
                <td className="sel id-3-1"><span onClick={() => setField('split003')}/></td>
                <td className="sel id-3-2"><span onClick={() => setField('split36')}/></td>
                <td className="sel id-3-3"><span onClick={() => setField('split69')}/></td>
                <td className="sel id-3-4"><span onClick={() => setField('split912')}/></td>
                <td className="sel id-3-5"><span onClick={() => setField('split1215')}/></td>
                <td className="sel id-3-6"><span onClick={() => setField('split1518')}/></td>
                <td className="sel id-3-7"><span onClick={() => setField('split1821')}/></td>
                <td className="sel id-3-8"><span onClick={() => setField('split2124')}/></td>
                <td className="sel id-3-9"><span onClick={() => setField('split2427')}/></td>
                <td className="sel id-3-10"><span onClick={() => setField('split2730')}/></td>
                <td className="sel id-3-11"><span onClick={() => setField('split3033')}/></td>
                <td className="sel id-3-12"><span onClick={() => setField('split3336')}/></td>
              </tr>

              <tr className="sel-col">
                <td className="pau id-4-1"></td>
                <td className="pau id-4-2"></td>
                <td className="pau id-4-3"></td>
                <td className="pau id-4-4"></td>
                <td className="pau id-4-5"></td>
                <td className="pau id-4-6"></td>
                <td className="pau id-4-7"></td>
                <td className="pau id-4-8"></td>
                <td className="pau id-4-9"></td>
                <td className="pau id-4-10"></td>
                <td className="pau id-4-11"></td>
                <td className="pau id-4-12"></td>
              </tr>

              <tr className="sel-row">
                <td className="sel id-5-1"><span onClick={() => setField('num0023')}/></td>
                <td className="pau id-5-2"></td>
                <td className="sel id-5-3"><span onClick={() => setField('split23')}/></td>
                <td className="pau id-5-4"></td>

                <td className="sel id-5-5"><span onClick={() => setField('corn2356')}/></td>
                <td className="pau id-5-6"></td>
                <td className="sel id-5-7"><span onClick={() => setField('split56')}/></td>
                <td className="pau id-5-8"></td>

                <td className="sel id-5-9"><span onClick={() => setField('corn5689')}/></td>
                <td className="pau id-5-10"></td>
                <td className="sel id-5-11"><span onClick={() => setField('split89')}/></td>
                <td className="pau id-5-12"></td>

                <td className="sel id-5-13"><span onClick={() => setField('corn891112')}/></td>
                <td className="pau id-5-14"></td>
                <td className="sel id-5-15"><span onClick={() => setField('split1112')}/></td>
                <td className="pau id-5-16"></td>

                <td className="sel id-5-17"><span onClick={() => setField('corn11121415')}/></td>
                <td className="pau id-5-18"></td>
                <td className="sel id-5-19"><span onClick={() => setField('split1415')}/></td>
                <td className="pau id-5-20"></td>

                <td className="sel id-5-21"><span onClick={() => setField('corn14151718')}/></td>
                <td className="pau id-5-22"></td>
                <td className="sel id-5-23"><span onClick={() => setField('split1718')}/></td>
                <td className="pau id-5-24"></td>

                <td className="sel id-5-25"><span onClick={() => setField('corn17182021')}/></td>
                <td className="pau id-5-26"></td>
                <td className="sel id-5-27"><span onClick={() => setField('split2021')}/></td>
                <td className="pau id-5-28"></td>

                <td className="sel id-5-29"><span onClick={() => setField('corn20212324')}/></td>
                <td className="pau id-5-30"></td>
                <td className="sel id-5-31"><span onClick={() => setField('split2324')}/></td>
                <td className="pau id-5-32"></td>

                <td className="sel id-5-33"><span onClick={() => setField('corn23242627')}/></td>
                <td className="pau id-5-34"></td>
                <td className="sel id-5-35"><span onClick={() => setField('split2627')}/></td>
                <td className="pau id-5-36"></td>

                <td className="sel id-5-37"><span onClick={() => setField('corn26272930')}/></td>
                <td className="pau id-5-38"></td>
                <td className="sel id-5-39"><span onClick={() => setField('split2930')}/></td>
                <td className="pau id-5-40"></td>

                <td className="sel id-5-41"><span onClick={() => setField('corn29303233')}/></td>
                <td className="pau id-5-42"></td>
                <td className="sel id-5-43"><span onClick={() => setField('split3233')}/></td>
                <td className="pau id-5-44"></td>

                <td className="sel id-5-45"><span onClick={() => setField('corn32333536')}/></td>
                <td className="pau id-5-46"></td>
                <td className="sel id-5-47"><span onClick={() => setField('split3536')}/></td>
                <td className="pau id-5-48"></td>     

                <td className="sel id-5-49"></td>
                <td className="pau wing id-5-50"></td>  
                <td className="sel id-5-51"></td>                   
              </tr>

              <tr className="values values-2">
                <td className="pre-zero id-6-1"></td>
                <td className="num num-02" colSpan="3" rowSpan="7" onClick={() => setField('num2')}></td>
                <td className="pre-pau-z id-6-2" rowSpan="3"></td>
                <td className="num num-05" colSpan="3" rowSpan="7" onClick={() => setField('num5')}></td>
                <td className="pre-pau-z id-6-3" rowSpan="3"></td>
                <td className="num num-08" colSpan="3" rowSpan="7" onClick={() => setField('num8')}></td>
                <td className="pre-pau-z id-6-4" rowSpan="3"></td>
                <td className="num num-11" colSpan="3" rowSpan="7" onClick={() => setField('num11')}></td>
                <td className="pre-pau-z id-6-5" rowSpan="3"></td>
                <td className="num num-14" colSpan="3" rowSpan="7" onClick={() => setField('num14')}></td>
                <td className="pre-pau-z id-6-6" rowSpan="3"></td>
                <td className="num num-17" colSpan="3" rowSpan="7" onClick={() => setField('num17')}></td>
                <td className="pre-pau-z id-6-7" rowSpan="3"></td>
                <td className="num num-20" colSpan="3" rowSpan="7" onClick={() => setField('num20')}></td>
                <td className="pre-pau-z id-6-8" rowSpan="3"></td>
                <td className="num num-23" colSpan="3" rowSpan="7" onClick={() => setField('num23')}></td>
                <td className="pre-pau-z id-6-9" rowSpan="3"></td>
                <td className="num num-26" colSpan="3" rowSpan="7" onClick={() => setField('num26')}></td>
                <td className="pre-pau-z id-6-10" rowSpan="3"></td>
                <td className="num num-29" colSpan="3" rowSpan="7" onClick={() => setField('num29')}></td>
                <td className="pre-pau-z id-6-11" rowSpan="3"></td>
                <td className="num num-32" colSpan="3" rowSpan="7" onClick={() => setField('num32')}></td>
                <td className="pre-pau-z id-6-12" rowSpan="3"></td>
                <td className="num num-35" colSpan="3" rowSpan="7" onClick={() => setField('num35')}></td>
                <td className="pau pre-pau-z id-6-13" rowSpan="7"></td>
                <td className="wing id-6-14 col-2-1" rowSpan="7" onClick={() => setField('col2')}><div className="wing"></div></td>
                <td className="pau pre-pau-z id-6-15" rowSpan="7"></td>
              </tr>

              <tr className="sel-z-col">
                <td className="sel id-7-1"><span onClick={() => setField('split002')}/></td>
              </tr>
              <tr className="sel-z-col">
                <td className="pau id-8-1"></td>
              </tr>

              <tr className="sel-col">
                <td className="sel id-9-1"></td>
                <td className="pau pau-z id-9-2"></td>
                <td className="sel sel-z id-9-3"><span onClick={() => setField('split000')}/></td>
                <td className="pau pau-z id-9-4"></td>
                <td className="sel id-9-5"><span onClick={() => setField('num0002')}/></td>
                <td className="sel id-9-6"><span onClick={() => setField('split25')}/></td>
                <td className="sel id-9-7"><span onClick={() => setField('split58')}/></td>
                <td className="sel id-9-8"><span onClick={() => setField('split811')}/></td>
                <td className="sel id-9-9"><span onClick={() => setField('split1114')}/></td>
                <td className="sel id-9-10"><span onClick={() => setField('split1417')}/></td>
                <td className="sel id-9-11"><span onClick={() => setField('split1720')}/></td>
                <td className="sel id-9-12"><span onClick={() => setField('split2023')}/></td>
                <td className="sel id-9-13"><span onClick={() => setField('split2326')}/></td>
                <td className="sel id-9-14"><span onClick={() => setField('split2629')}/></td>
                <td className="sel id-9-15"><span onClick={() => setField('split2932')}/></td>
                <td className="sel id-9-16"><span onClick={() => setField('split3235')}/></td>
              </tr>

              <tr className="sel-col">
                <td className="pau id-10-1" rowSpan="7"></td>
                <td className="zero wing num-0" colSpan="3" rowSpan="7" onClick={() => setField('num0')}><div className="wing"></div></td>
                <td className="pre-zero id-10-2"></td>
                <td className="pau id-10-3" rowSpan="3"></td>
                <td className="pau id-10-4" rowSpan="3"></td>
                <td className="pau id-10-5" rowSpan="3"></td>
                <td className="pau id-10-6" rowSpan="3"></td>
                <td className="pau id-10-7" rowSpan="3"></td>
                <td className="pau id-10-8" rowSpan="3"></td>
                <td className="pau id-10-9" rowSpan="3"></td>
                <td className="pau id-10-10" rowSpan="3"></td>
                <td className="pau id-10-11" rowSpan="3"></td>
                <td className="pau id-10-12" rowSpan="3"></td>
                <td className="pau id-10-13" rowSpan="3"></td>
              </tr>

              <tr className="sel-z-col">
                <td className="sel id-11-1"><span onClick={() => setField('split02')}/></td>
              </tr>
              <tr className="sel-z-col">
                <td className="pau id-12-1"></td>
              </tr>

              <tr className="sel-row">
                <td className="sel id-13-1"><span onClick={() => setField('num012')}/></td>
                <td className="pau id-13-2"></td>
                <td className="sel id-13-3"><span onClick={() => setField('split12')}/></td>
                <td className="pau id-13-4"></td>

                <td className="sel id-13-5"><span onClick={() => setField('corn1245')}/></td>
                <td className="pau id-13-6"></td>
                <td className="sel id-13-7"><span onClick={() => setField('split45')}/></td>
                <td className="pau id-13-8"></td>

                <td className="sel id-13-9"><span onClick={() => setField('corn4578')}/></td>
                <td className="pau id-13-10"></td>
                <td className="sel id-13-11"><span onClick={() => setField('split78')}/></td>
                <td className="pau id-13-12"></td>

                <td className="sel id-13-13"><span onClick={() => setField('corn781011')}/></td>
                <td className="pau id-13-14"></td>
                <td className="sel id-13-15"><span onClick={() => setField('split1011')}/></td>
                <td className="pau id-13-16"></td>

                <td className="sel id-13-17"><span onClick={() => setField('corn10111314')}/></td>
                <td className="pau id-13-18"></td>
                <td className="sel id-13-19"><span onClick={() => setField('split1314')}/></td>
                <td className="pau id-13-20"></td>

                <td className="sel id-13-21"><span onClick={() => setField('corn13141617')}/></td>
                <td className="pau id-13-22"></td>
                <td className="sel id-13-23"><span onClick={() => setField('split1617')}/></td>
                <td className="pau id-13-24"></td>

                <td className="sel id-13-25"><span onClick={() => setField('corn16171920')}/></td>
                <td className="pau id-13-26"></td>
                <td className="sel id-13-27"><span onClick={() => setField('split1920')}/></td>
                <td className="pau id-13-28"></td>

                <td className="sel id-13-29"><span onClick={() => setField('corn19202223')}/></td>
                <td className="pau id-13-30"></td>
                <td className="sel id-13-31"><span onClick={() => setField('split2223')}/></td>
                <td className="pau id-13-32"></td>

                <td className="sel id-13-33"><span onClick={() => setField('corn22232526')}/></td>
                <td className="pau id-13-34"></td>
                <td className="sel id-13-35"><span onClick={() => setField('split2526')}/></td>
                <td className="pau id-13-36"></td>

                <td className="sel id-13-37"><span onClick={() => setField('corn25262829')}/></td>
                <td className="pau id-13-38"></td>
                <td className="sel id-13-39"><span onClick={() => setField('split2829')}/></td>
                <td className="pau id-13-40"></td>

                <td className="sel id-13-41"><span onClick={() => setField('corn28293132')}/></td>
                <td className="pau id-13-42"></td>
                <td className="sel id-13-43"><span onClick={() => setField('split3132')}/></td>
                <td className="pau id-13-44"></td>

                <td className="sel id-13-45"><span onClick={() => setField('corn31323435')}/></td>
                <td className="pau id-13-46"></td>
                <td className="sel id-13-47"><span onClick={() => setField('split3435')}/></td>
                <td className="pau id-13-48"></td>

                <td className="sel id-13-49"></td>
                <td className="pau wing id-13-50"></td>  
                <td className="sel id-13-51"></td>    
              </tr>

              <tr className="values values-3">
                <td className="pau id-14-1"></td>
                <td className="num num-01" colSpan="3" rowSpan="3" onClick={() => setField('num1')}></td>
                <td className="pau id-14-2"></td>
                <td className="num num-04" colSpan="3" rowSpan="3" onClick={() => setField('num4')}></td>
                <td className="pau id-14-3"></td>
                <td className="num num-07" colSpan="3" rowSpan="3" onClick={() => setField('num7')}></td>
                <td className="pau id-14-4"></td>
                <td className="num num-10" colSpan="3" rowSpan="3" onClick={() => setField('num10')}></td>
                <td className="pau id-14-5"></td>
                <td className="num num-13" colSpan="3" rowSpan="3" onClick={() => setField('num13')}></td>
                <td className="pau id-14-6"></td>
                <td className="num num-16" colSpan="3" rowSpan="3" onClick={() => setField('num16')}></td>
                <td className="pau id-14-7"></td>
                <td className="num num-19" colSpan="3" rowSpan="3" onClick={() => setField('num19')}></td>
                <td className="pau id-14-8"></td>
                <td className="num num-22" colSpan="3" rowSpan="3" onClick={() => setField('num22')}></td>
                <td className="pau id-14-9"></td>
                <td className="num num-25" colSpan="3" rowSpan="3" onClick={() => setField('num25')}></td>
                <td className="pau id-14-10"></td>
                <td className="num num-28" colSpan="3" rowSpan="3" onClick={() => setField('num28')}></td>
                <td className="pau id-14-11"></td>
                <td className="num num-31" colSpan="3" rowSpan="3" onClick={() => setField('num31')}></td>
                <td className="pau id-14-12"></td>
                <td className="num num-34" colSpan="3" rowSpan="3" onClick={() => setField('num34')}></td>
                <td className="pau id-14-13" rowSpan="3"></td>
                <td className="row wing col-2-1" rowSpan="3" onClick={() => setField('col1')}><div className="wing"></div></td>
                <td className="pau id-14-14" rowSpan="3"></td>
              </tr>

              <tr className="sel-col">
                <td className="sel id-15-1"><span onClick={() => setField('split01')}/></td>
                <td className="sel id-15-2"><span onClick={() => setField('split14')}/></td>
                <td className="sel id-15-3"><span onClick={() => setField('split47')}/></td>
                <td className="sel id-15-4"><span onClick={() => setField('split710')}/></td>
                <td className="sel id-15-5"><span onClick={() => setField('split1013')}/></td>
                <td className="sel id-15-6"><span onClick={() => setField('split1316')}/></td>
                <td className="sel id-15-7"><span onClick={() => setField('split1619')}/></td>
                <td className="sel id-15-8"><span onClick={() => setField('split1922')}/></td>
                <td className="sel id-15-9"><span onClick={() => setField('split2225')}/></td>
                <td className="sel id-15-10"><span onClick={() => setField('split2528')}/></td>
                <td className="sel id-15-11"><span onClick={() => setField('split2831')}/></td>
                <td className="sel id-15-12"><span onClick={() => setField('split3134')}/></td>
              </tr>

              <tr className="sel-col">
                <td className="pau id-16-1"></td>
                <td className="pau id-16-2"></td>
                <td className="pau id-16-3"></td>
                <td className="pau id-16-4"></td>
                <td className="pau id-16-5"></td>
                <td className="pau id-16-6"></td>
                <td className="pau id-16-7"></td>
                <td className="pau id-16-8"></td>
                <td className="pau id-16-9"></td>
                <td className="pau id-16-10"></td>
                <td className="pau id-16-11"></td>
                <td className="pau id-16-12"></td>
              </tr>

              <tr className="sel-row">
                <td className="sel id-17-1"></td>
                <td className="pau wing id-17-2" colSpan="3"></td>
                <td className="sel id-17-3"><span onClick={() => setField('num000123')}/></td>
                <td className="pau id-17-4"></td>

                <td className="sel id-17-5"><span onClick={() => setField('str13')}/></td>
                <td className="pau id-17-6"></td>
                <td className="sel id-17-7"><span onClick={() => setField('line16')}/></td>
                <td className="pau id-17-8"></td>

                <td className="sel id-17-9"><span onClick={() => setField('str46')}/></td>
                <td className="pau id-17-10"></td>
                <td className="sel id-17-11"><span onClick={() => setField('line49')}/></td>
                <td className="pau id-17-12"></td>

                <td className="sel id-17-13"><span onClick={() => setField('str79')}/></td>
                <td className="pau id-17-14"></td>
                <td className="sel id-17-15"><span onClick={() => setField('line712')}/></td>
                <td className="pau id-17-16"></td>

                <td className="sel id-17-17"><span onClick={() => setField('str1012')}/></td>
                <td className="pau id-17-18"></td>
                <td className="sel id-17-19"><span onClick={() => setField('line1015')}/></td>
                <td className="pau id-17-20"></td>

                <td className="sel id-17-21"><span onClick={() => setField('str1315')}/></td>
                <td className="pau id-17-22"></td>
                <td className="sel id-17-23"><span onClick={() => setField('line1318')}/></td>
                <td className="pau id-17-24"></td>

                <td className="sel id-17-25"><span onClick={() => setField('str1618')}/></td>
                <td className="pau id-17-26"></td>
                <td className="sel id-17-27"><span onClick={() => setField('line1621')}/></td>
                <td className="pau id-17-28"></td>

                <td className="sel id-17-29"><span onClick={() => setField('str1921')}/></td>
                <td className="pau id-17-30"></td>
                <td className="sel id-17-31"><span onClick={() => setField('line1924')}/></td>
                <td className="pau id-17-32"></td>

                <td className="sel id-17-33"><span onClick={() => setField('str2224')}/></td>
                <td className="pau id-17-34"></td>
                <td className="sel id-17-35"><span onClick={() => setField('line2227')}/></td>
                <td className="pau id-17-36"></td>

                <td className="sel id-17-37"><span onClick={() => setField('str2527')}/></td>
                <td className="pau id-17-38"></td>
                <td className="sel id-17-39"><span onClick={() => setField('line2530')}/></td>
                <td className="pau id-17-40"></td>

                <td className="sel id-17-41"><span onClick={() => setField('str2830')}/></td>
                <td className="pau id-17-42"></td>
                <td className="sel id-17-43"><span onClick={() => setField('line2833')}/></td>
                <td className="pau id-17-44"></td>

                <td className="sel id-17-45"><span onClick={() => setField('str3133')}/></td>
                <td className="pau id-17-46"></td>
                <td className="sel id-17-47"><span onClick={() => setField('line3136')}/></td>
                <td className="pau id-17-48"></td>

                <td className="sel id-17-49"><span onClick={() => setField('str3436')}/></td>
                <td className="pau id-17-50"></td>    
                <td className="sel id-17-51"></td>
                <td className="pau wing id-17-52"></td>  
                <td className="sel id-17-53"></td>                
              </tr>
            
              <tr className="section-zone">
                <td className="hidden" colSpan="4"></td>  
                <td className="pau"></td>  
                <td className="zone-row" colSpan="15" onClick={() => setField('doz112')}>1-12</td>
                <td className="pau"></td>  
                <td className="zone-row" colSpan="15" onClick={() => setField('doz212')}>2-12</td>
                <td className="pau"></td>  
                <td className="zone-row" colSpan="15" onClick={() => setField('doz312')}>3-12</td>
                <td className="pau"></td>  
                <td className="zone-row warranty" colSpan="15" rowSpan="4" >
                  <a href="/warranty">ГЧи</a>
                </td>
                <td className="hidden"></td>  
              </tr>

              <tr className="sel-row">
                <td className="hidden" colSpan="4"></td> 
                <td className="pau" colSpan="49"></td>  
              </tr>
      
              <tr className="section-zone">
                <td className="hidden" colSpan="4"></td>  
                <td className="pau"></td>   
                <td className="zone-row" colSpan="7" onClick={() => setField('half118')}>1-18</td>
                <td className="pau"></td>  
                <td className="zone-row" colSpan="7" onClick={() => setField('even')}>EVEN</td>
                <td className="pau"></td>  
                <td className="zone-row" colSpan="7" onClick={() => setField('red')}>Red</td>
                <td className="pau"></td>  
                <td className="zone-row" colSpan="7" onClick={() => setField('black')}>Black</td>
                <td className="pau"></td>  
                <td className="zone-row" colSpan="7" onClick={() => setField('odd')}>ODD</td>
                <td className="pau"></td>  
                <td className="zone-row" colSpan="7" onClick={() => setField('half1936')}>19-36</td>
                <td className="pau"></td>  
                <td className="hidden"></td>
              </tr>

              <tr className="sel-row">
                <td className="hidden" colSpan="4"></td> 
                <td className="pau" colSpan="49"></td>  
              </tr>   
            </tbody>       
          </table>
        </div>
      </div>
    </div>
  )
}

export default Roulette;
