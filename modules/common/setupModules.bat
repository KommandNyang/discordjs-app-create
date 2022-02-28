@echo off
cd %PROJECT_DIR%

echo Please Don't Close This Window

npm init --yes

npm i dotenv 

IF %DJSVER%==12 (
    npm i discord.js@12.5.3
) ELSE (
    npm i discord.js@latest
)

IF %USEKOMM%==1 (
    npm i discord-kommando.js
)

IF %USEDOK% (
    IF %DJSVER%==12 (
        npm i dokdo@djsv12
    ELSE (
        npm i dokdo@latest
    )
)

IF %USEDISBUT%==1 (
    npm i discord-buttons
)

echo Finished installing modules
echo You can close this Window now
echo ----------------------------------------------------
pause