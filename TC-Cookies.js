// TC.Cookies.js
var g_cCookieDelimiter = '^';
  
function StoreCookie_Settings()
{
    var sCookieToAdd = MakeCookie_Settings()
    document.cookie = sCookieToAdd;
setline('StoredCookie_Settings');
}

function HandleCookiesOnStart()
{
    let s = document.cookie;
    if ( s == '' )
    {
//        setline('C:NoCookies');
        return false;
    }
    var aCookies = s.split(';');
    var iCookies = aCookies.length;
//    
    var sOurCookieName_Puzzle = "SketchiCross-" + sPuzzleDate;
    var sOurCookieName_Settings = 'SketchiCross-Settings'; 
    var sOurCookie_Puzzle = '';
    var sOurCookie_Settings = '';
    for ( var iCookie = 0; iCookie < iCookies ; iCookie++)
    {
        var sThisCookie = aCookies[iCookie]
        if ( sThisCookie.includes(sOurCookieName_Puzzle) )
            sOurCookie_Puzzle = sThisCookie;
        if ( sThisCookie.includes(sOurCookieName_Settings) )
        {
            sOurCookie_Settings = sThisCookie;
        }
    }
    HandleCookie_Puzzle(sOurCookie_Puzzle);
    HandleCookie_Settings(sOurCookie_Settings);
}

function HandleCookie_Puzzle(sOurCookie_Puzzle)
{
    if ( sOurCookie_Puzzle == '')
    {
setline('CP:EmptyPuzzleCookie');
        return;
    }
    var iEqual = sOurCookie_Puzzle.indexOf("=");
    if ( iEqual == -1 )
    {   
setline('CP:cookiemissing=')
        return false;
    }
    var sCookieValue = sOurCookie_Puzzle.substring(iEqual + 1);
    var aOurValues = sCookieValue.split(g_cCookieDelimiter);
    var iOurValues = aOurValues.length;
    if ( iOurValues != 9 )
    {
setline('CP:not7values')
        return false;
    }
    if ( sPuzzleName != aOurValues[0] )
    {
setline("CP:wrong puzzle:" + sPuzzleName + ':' + aOurValues[0])
        return false;
    }
    sAnswersPlayer = aOurValues[1];
    sStatusPlayer = aOurValues[2];
    sGridAnswersPlayer = aOurValues[3];
    sGridStatusPlayer = aOurValues[4];
    g_bPuzzleSolved = IsTrue(aOurValues[6]);
    g_bGridSolved = IsTrue(aOurValues[7]);
    g_bAnswersSolved = IsTrue(aOurValues[8]);
setline('CP.LoadedPuzzleCookie');
}

function StoreCookie_Puzzle()
{
    var sCookieToAdd = MakeCookie_Puzzle(g_sPuzzleDate, g_sPuzzleName, g_sAnswersPlayer, g_sAnswersStatusPlayer, g_sGridAnswersPlayer, g_sGridStatusPlayer, 0, g_bPuzzleSolved)
    document.cookie = sCookieToAdd;
//setline('storepuzzlecookie')
}

function MakeCookie_Puzzle(sDate, sPuzzleName, sAnswersPlayer, sStatusPlayer, sGridAnswersPlayer, sGridStatusPlayer, iSeconds, bPuzzleSolved)
{
    var sCookieName = 'SketchiCross-' + sDate;
    var sCookie = '';
    sCookie += sPuzzleName;
     sCookie += g_cCookieDelimiter;
    sCookie += sAnswersPlayer
     sCookie += g_cCookieDelimiter;
    sCookie += sStatusPlayer
     sCookie += g_cCookieDelimiter;
    sCookie += sGridAnswersPlayer
     sCookie += g_cCookieDelimiter;
    sCookie += sGridStatusPlayer
    sCookie += g_cCookieDelimiter;
    sCookie += iSeconds;
    sCookie += g_cCookieDelimiter;
    sCookie += g_bPuzzleSolved;
    sCookie += g_cCookieDelimiter;
    sCookie += g_bGridSolved;
    sCookie += g_cCookieDelimiter;
    sCookie += g_bAnswersSolved;
    var exdays = 365;
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    var sFullCookie = sCookieName + "=" + sCookie + ";" + expires;// + ";path=/";
    return sFullCookie;
}

function DeleteCookiesMatching(sMatch)
{
    let s = document.cookie;
    var aCookies = s.split(';');
    var iCookies = aCookies.length;
    for ( var iCookie = 0; iCookie < iCookies; iCookie++ )
    {
        var sThisCookie = aCookies[iCookie]
        if ( sMatch == '' || sThisCookie.startsWith(sMatch) )
        {
            const d = new Date();
            d.setTime(d.getTime());
            let expires = "expires="+ d.toUTCString();
            sThisCookie += ';' + expires;
            document.cookie = sThisCookie;
        }
    }
setline("ClearedCookies:" + sMatch + ';')
}
