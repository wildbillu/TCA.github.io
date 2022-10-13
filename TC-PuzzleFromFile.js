// TC-PuzzleFromFile.js
// 
function LoadPuzzleFromFile(sFilename)
{
    var iUpdated = 0;
    var xmlhr = new XMLHttpRequest();
    var sFullFilename = 'puzzles/' + sFilename;
    xmlhr.open( "GET", sFullFilename, false);
    xmlhr.send( null );
    var sResult = xmlhr.responseText;
    if ( sResult.search('404 Not Found') != -1 )
    {
        setline('F:Didnotfindpuzzlefile');
        return;
    }
    var aLines = sResult.split('\n');
    var iLines = aLines.length;
    for ( var iLine = 0; iLine < iLines; iLine++)
    {
        var sLine = aLines[iLine];
        sLine = sLine.substring(0, sLine.length - 1)
        if ( sLine.startsWith('sGridAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleDate=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sPuzzleDate = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleName=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sPuzzleName = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleTitle=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sPuzzleTitle = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('iGridWidth=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iGridWidth = parseInt(aEntries[1]); iUpdated++;}}
        else if ( sLine.startsWith('iGridHeight=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iGridHeight = parseInt(aEntries[1]); iUpdated++;}}
        else if ( sLine.startsWith('iClueAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iClueAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sClues=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sClues = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswersPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswersPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sStatusPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sStatusPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sSketchiToonsFilename=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sSketchiToonsFilename = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sSketchiToonsClueItself=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sSketchiToonsClueItself = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sSketchiToonsClueIntro=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sSketchiToonsClueIntro = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sSuccessWindowFilename=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sSuccessWindowFilename = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridAnswersPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswersPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridStatusPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridStatusPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridNumbering=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridNumbering = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sDualClueBefore=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sDualClueBefore = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sDualClueMiddle=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sDualClueMiddle = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sDualClueEnd=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sDualClueEnd = aEntries[1]; iUpdated++;}}
    }
    setline(sFilename + '.Updated:' + iUpdated + ';');
}
