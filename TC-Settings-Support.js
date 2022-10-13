// TC-Settings-Support.js
// settings
var g_sSettings_Version = 'V01.01';
var g_bSettings_DeleteCookiesOnStartUp = false;
var g_bSettings_CAGR_Answers_CheckRow = false;
var g_bSettings_CAGR_Answers_CheckOverall = false;
var g_bSettings_CAGR_Answers_ShowCorrectLetters = false;
var g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares = false;
var g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare = false;
var g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue = false;
var g_bSettings_CA_Display_ShowProgress = true;
var g_bSettings_GR_Display_ShowProgress = true;
var g_bSettings_CAGR_Display_Complete = true;
var g_iSettings_DaysToExpire = 30;

function IsTrue(s){var b = false;if ( s == 'true')b = true;return b;}

function HandleCookie_Settings(sOurCookie_Settings)
{
    if ( sOurCookie_Settings == '')
    {
//        setline('CS:EmptySettingsCookie');
        return;
    }
    var iEqual = sOurCookie_Settings.indexOf("=");
    if ( iEqual == -1 )
    {   
        setline('CS:cookiemissing=')
        return false;
    }
    var sCookieValue = sOurCookie_Settings.substring(iEqual + 1);
    var aOurValues = sCookieValue.split(g_cCookieDelimiter);
    var iOurValues = aOurValues.length;
    if ( iOurValues == 0 )
    {   
        setline('CS:NoValues')
        return false;
    }
    if ( aOurValues[0] != g_sSettings_Version )
    {
        setline('CS:UnsupportedVersion')
        return false;
    }
    var iMustHaveValues = 1;
    if ( g_sSettings_Version == 'V01.01' )
        iMustHaveValues = 12;
    if ( iOurValues != iMustHaveValues )
    {
        setline('CS:WrongNumberOfValues')
        return false;
    }
    var iOurValue = 1;
    g_bSettings_DeleteCookiesOnStartUp = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Answers_CheckRow = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Answers_CheckOverall = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Answers_ShowCorrectLetters = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CA_Display_ShowProgress = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_GR_Display_ShowProgress = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Display_Complete = IsTrue(aOurValues[iOurValue++]);
    g_iSettings_DaysToExpire = parseInt(aOurValues[iOurValue++]);
    setline('SettingsCookie.Set:' + iOurValue)
}

function MakeCookie_Settings()
{
    var sCookieName = 'SketchiCross-Settings';
    var sCookie = '';
    sCookie += g_sSettings_Version; 
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_DeleteCookiesOnStartUp;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Answers_CheckRow;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Answers_CheckOverall;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Answers_ShowCorrectLetters;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CA_Display_ShowProgress;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_GR_Display_ShowProgress;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Display_Complete;
    sCookie += g_cCookieDelimiter; sCookie += g_iSettings_DaysToExpire;
//    
    const d = new Date();
    d.setTime(d.getTime() + (g_iSettings_DaysToExpire*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    var sFullCookie = sCookieName + "=" + sCookie + ";" + expires;// + ";path=/";
    return sFullCookie;
}

