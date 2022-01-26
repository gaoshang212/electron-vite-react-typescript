!define SCHEMENAME "evtr"

!macro customInstall
  DetailPrint "Register ${SCHEMENAME} URI Handler"
  DeleteRegKey HKCR "${SCHEMENAME}"
  WriteRegStr HKCR "${SCHEMENAME}" "" "${PRODUCT_NAME}"
  WriteRegStr HKCR "${SCHEMENAME}" "URL Protocol" ""
  WriteRegStr HKCR "${SCHEMENAME}\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "${SCHEMENAME}\shell" "" ""
  WriteRegStr HKCR "${SCHEMENAME}\shell\Open" "" ""
  WriteRegStr HKCR "${SCHEMENAME}\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend

!macro customUnInstall 
  DeleteRegKey HKCR "${SCHEMENAME}"
  ReadRegStr $0 HKCR "${SCHEMENAME}" ""
  DeleteRegKey HKCR "$0"
!macroend