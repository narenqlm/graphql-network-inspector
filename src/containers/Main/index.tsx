import {useState} from "react"
import {SplitPaneLayout} from "@/components/Layout"
import {useNetworkMonitor} from "@/hooks/useNetworkMonitor"
import {useSearch} from "@/hooks/useSearch"
import {useNetworkTabs} from "@/hooks/useNetworkTabs"
import {NetworkPanel} from "../NetworkPanel"
import {SearchPanel} from "../SearchPanel"
import {SupportPopover} from "../../components/SupportPopover"

export const Main = () => {
    const [selectedRowId, setSelectedRowId] = useState<string | number | null>(
        null
    )
    const [networkRequests, clearWebRequests] = useNetworkMonitor()
    const {isSearchOpen} = useSearch()
    const {setActiveTab} = useNetworkTabs()

    const onDownload = () => {
        const transformed: any = []
        const requestList: string[] = []
        networkRequests.forEach((item) => {
            const operationName = item.request.primaryOperation.operationName
            if (!requestList.includes(operationName)) {
                requestList.push(operationName)
                transformed.push({operationName, time: item.time, status: item.status})
            }
        })
        saveTemplateAsFile("graphql_request_log.json", transformed)
    }
    const saveTemplateAsFile = (filename: string, dataObjToWrite: any) => {
        const blob = new Blob([JSON.stringify(dataObjToWrite)], {type: "text/json"});
        const link = document.createElement("a");

        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

        const evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        link.dispatchEvent(evt);
        link.remove()
    };

    return (
        <>
            <SplitPaneLayout
                leftPane={
                    isSearchOpen ? (
                        <SearchPanel
                            networkRequests={networkRequests}
                            onResultClick={(searchResult, networkTab) => {
                                setSelectedRowId(searchResult.networkRequest.id)
                                setActiveTab(networkTab)
                            }}
                        />
                    ) : undefined
                }
                rightPane={
                    <NetworkPanel
                        networkRequests={networkRequests}
                        clearWebRequests={clearWebRequests}
                        selectedRowId={selectedRowId}
                        setSelectedRowId={setSelectedRowId}
                        onDownload={onDownload}
                    />
                }
            />
            <SupportPopover/>
        </>
    )
}
