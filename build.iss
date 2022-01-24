#define MyAppName "Serial Monitor"
#define MyAppVersion "1.0.0"
#define MyAppExeName "minimal-electron-app.exe"
#define MyAppId "miniapp"

[Setup]
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName}

DefaultDirName={commonappdata}\{#MyAppId}
DefaultGroupName={#MyAppId}
OutputDir=.\releases
OutputBaseFilename={#MyAppName}
SetupIconFile=installer.ico
UninstallDisplayIcon={app}\{#MyAppExeName}
Compression=lzma/ultra
SolidCompression=yes
AppMutex={#MyAppName}
; "ArchitecturesAllowed=x64" specifies that Setup cannot run on
; anything but x64.
ArchitecturesAllowed=
; "ArchitecturesInstallIn64BitMode=x64" requests that the install be
; done in "64-bit mode" on x64, meaning it should use the native
; 64-bit Program Files directory and the 64-bit view of the registry.
ArchitecturesInstallIn64BitMode=x64
;PrivilegesRequired=admin

[Registry]
;;;;;;;;;;;


[Tasks]
Name:desktopicon; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: ".\releases\minimal-electron-app-win32-ia32\minimal-electron-app.exe"; DestDir: "{app}"; DestName: "{#MyAppExeName}";Flags: ignoreversion recursesubdirs createallsubdirs ;Permissions:users-modify
Source: ".\releases\minimal-electron-app-win32-ia32\*"; DestDir: "{app}";Flags: ignoreversion recursesubdirs createallsubdirs; AfterInstall: MyAfterInstall()
Source: ".\*.ico"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}";Tasks: desktopicon;IconFilename:"{app}\minimal-electron-app.exe"

[InstallDelete]
Type: filesandordirs; Name: "{app}"

[UninstallDelete]
Type: filesandordirs; Name: "{app}"

[Run]
Filename: "{app}\{#MyAppExeName}";Description: "{cm:LaunchProgram, {#StringChange(MyAppName, '&', '&&')}}"; Flags: postinstall nowait skipifsilent

[Code]

// 安装完启动
procedure MyAfterInstall();
var FileName:String ;
begin
  begin
    FileName := ExpandConstant('{app}') + '\'+'{#MyAppExeName}';
    //安装并启动
  end
end;

// 安装前停止并卸载服务
procedure CurStepChanged(CurStep: TSetupStep); //1399
var ErrorCode: Integer;

//要关闭minimal-electron-app
begin
  if (CurStep=ssInstall) then
  begin
    ShellExec('open' , ExpandConstant('{cmd}'), '/c taskkill /im minimal-electron-app.exe /f', ExpandConstant('{win}'),SW_HIDE, ewWaitUntilTerminated, ErrorCode);
    //先停止服务再删除目录
    DelTree(ExpandConstant('{app}'), True, True, True);
  end;
end;

// 卸载干掉服务
procedure CurUninstallStepChanged (CurUninstallStep: TUninstallStep );
var ErrorCode: Integer;
begin
  if(CurUninstallStep=usUninstall)then
  begin
    ShellExec('open' , ExpandConstant('{cmd}'), '/c taskkill /im minimal-electron-app.exe /f', ExpandConstant('{win}'),SW_HIDE, ewWaitUntilTerminated, ErrorCode);
  end;
end;
