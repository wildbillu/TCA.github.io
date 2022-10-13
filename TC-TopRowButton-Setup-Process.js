// TC-TopRowButton-Setup-Process.js
// 
function TopRowButtons_Setup()
{
    sInnerHTML = '';
    var sImage;
    sImage = '<img Id="Button_Direction_Image" src="images/Button_ChangeDirection.png" alt="ChangeDirection" width=100%>';
    sInnerHTML += '<BUTTON Id="Button_Direction" class="TopRowControl_Button" onclick="TRB_Click_Direction();">';
    sInnerHTML += sImage;
    sInnerHTML += '</BUTTON>';
//
    sInnerHTML += Make_Button_Info();
//
    sImage = '<img Id="Button_Settings_Image" src="images/Button_Settings.png" alt="Settings" width=100%>'
    sInnerHTML += '<BUTTON Id="Button_Settings_A" class="TopRowControl_Button" onclick="TRB_Click_Settings();">';
    sInnerHTML += sImage;
    sInnerHTML += '</BUTTON>';
    sInnerHTML += Make_Dropdown_Menu_More();
//    
    document.getElementById("TopRowControl").class = "TopRowControlClass";
    document.getElementById("TopRowControl").innerHTML = sInnerHTML;
//
    Insertable_Dropdown_Menu_More();
//
    Load_Button_Settings_Popup();
    Load_Button_Info();
}

function TRB_Click_Direction()
{
    if ( !Dropdown_CanOpen() )
        return false;
    GRB_ChangeDirection();
}

function TRB_Click_Settings()
{
    if ( !Dropdown_CanOpen() )
        return false;
    Button_Settings_Toggle();
}
