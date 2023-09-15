
@echo off
set exePath=%2
set m=%m:runExe:=%
set m="%m:separator=&%"
start "" "%exePath%" %m%
exit
