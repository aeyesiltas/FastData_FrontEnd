import { useState, useEffect } from "react";
import { Button } from "evergreen-ui";
import axios from "axios";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import TreeMenu from 'react-simple-tree-menu';
import '../../../node_modules/react-simple-tree-menu/dist/main.css';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import { Typography, Box } from "@mui/material";
import { PlusIcon } from "evergreen-ui";

function SidebarComponent(props) {
    const [hierarchy, setHeirarchy] = useState([])
    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const [contextMenuActions, setContextMenuActions] = useState([])
    const projectContextMenuActions = ['New Project', 'New Folder', 'Delete Project'];
    const folderContextMenuActions = ['New Job', 'New Sub Folder', 'Delete Folder'];
    const jobContextMenuActions = ['Delete Job'];

    useEffect(() => {
        axios.get("http://localhost:5000/api/get2").then(res => {
            setHeirarchy(res.data);
        })
    }, [])

    const handleCreateFolder = (id, isSubFolder) => {
        props.setSelectedProjectId({"id":id, "isSubFolder":isSubFolder});
        props.setMode(1);
    }

    const handleCreateProject = () => {
        props.setMode(2);
    }

    const handleCreateJob = (id) => {
        props.setSelectedProjectId(id)
        props.setMode(3);
    }

    const jobPicked = (id) => {
        props.setSelectedJobId(id)
        props.setMode(4);
    }

    const renderTree = (nodes) => (
        <>
            {nodes.type === "project" ? <TreeItem key={nodes.id} nodeId={nodes.id} label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAACLklEQVR4nJVSS2gTURTNyrUL9/42uqhYEMGFEhFF3VTNhFhKCn6T1PmYNIXMJJ1JwFIrdWFSbJO8qeDefV2IsUjIp9ZP66pVlJa2olBJJvUzyRyZl5/BRPTAgTeXd865992xWDoA3x7sgjZ9lnKL7DRrdkE6yAhBe69P2dFJZ0GRnEBJnUNJRZ2bG3HohWT+qiSnGV4CI0j9PYKy3a4o21rFpSQLTa1QYTEOY02GvhrCzVsynEMhOL2DYDzc53Nu/ybDSQUbL0Vak6mYoPLOA322G3qqC18eHwIfFOAUBMTIMD4sTRh2l6dwgQ3AxovxpoGm5s1kKk51tfBR4jwucZfx8e0oHSmWDJZ63D7dwQX31h5M3UPbLkw1kvX0EcpPT6xwCCIcnBf97DVMTofguMGC4UUwnDhTTz9jGhgbYSouZ60w1iMwVgKU6sNhTMWuoM87CNuAH4E7YbhCctrOiydrBsnT1GBdqaY/O0CF5YwV5cxRGKsirUXvOmFuYWFhAtDIqd92nthdHWGyOcLzwzBWhijNM63NdgOF+9X11v6NBqCRHH3EZXfj8eoj1L8rS9erYo1kmsoaUCTHoZEyNVm8+IdB+Q0Dc8X0zhY5ZmkHlMgAvfA1iuUZF96/jFOaZ7NWDSDutmJLo5OkFZqalcdewB/JwadkKc22Oya3w1js1ffb0dcIj89DGsn9/GdhHcHROSkwktfl8fkf9xKLff9tYMLpSe3vZZ/u+9ulXx5b5tJ0IEfmAAAAAElFTkSuQmCC"/>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 'inherit', marginLeft: '5px' }}>
                        {nodes.name}
                    </Typography>
                </Box>
            }
                onContextMenu={(event) => handleContextMenu(event, nodes.id, nodes.type)}>
                {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
            </TreeItem> : <></>}

            {nodes.type === "folder" ? <TreeItem key={nodes.id} nodeId={nodes.id} label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <div class="icons8-folder"></div>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 'inherit', marginLeft: '5px' }}>
                        {nodes.name}
                    </Typography>
                </Box>
            }
                onContextMenu={(event) => handleContextMenu(event, nodes.id, nodes.type)}>
                {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
            </TreeItem> : <></>}

            {nodes.type === "job" ? <TreeItem key={nodes.id} nodeId={nodes.id} label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAz0lEQVR4nLWTPQrCQBCFPzC1NkKKPZGgjRYBr5JLbJ0j2KSxyVFSRAJq6w2SyMIrJpIfNPjgkd03s/Ozs4E/YaVvKlptFhlQAA6oRSct2GbhgW6Efi6zV8YKOANXMaxvsvmhSiKV2OnwVvpFRFoln0JnenAyJtofgJe4l5bIJ/j2kKq8YIylPU3vD2mx9rWZzmCAE9CYAI200QC2hRJogRy4i7m0cqyFyFxicNx9Okhrpy4xM2MMmY7AGthoXU6NEYOfH5KtZNFTDlj0M32FN3ucVRF34PMGAAAAAElFTkSuQmCC"/>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 'inherit', marginLeft: '5px' }}>
                        {nodes.name}
                    </Typography>
                </Box>
            }
            onClick={()=>{jobPicked(nodes.id)}}
                onContextMenu={(event) => handleContextMenu(event, nodes.id, nodes.type)}>
                {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
            </TreeItem> : <></>}
        </>

    );

    const handleContextMenu = (event, nodeId, nodeType) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(nodeType);
        if (nodeType === "project"){
            contextMenuActions.length = 0;
            setContextMenuActions(projectContextMenuActions)
        }
        else if (nodeType === "folder"){
            contextMenuActions.length = 0;
            setContextMenuActions(folderContextMenuActions)
        }
        else if (nodeType === "job"){
            contextMenuActions.length = 0;
            setContextMenuActions(jobContextMenuActions)
        }
        console.log(contextMenuActions)
        setContextMenuPosition({ top: event.clientY, left: event.clientX, nodeId });
    };

    const handleCloseContextMenu = () => {
        setContextMenuPosition(null);
    };

    const handleMenuItemClick = (action, nodeId) => {
        // Handle menu item click based on the action and nodeId0
        if (action === 'New Project') {
            handleCreateProject();
        }
        if (action === 'New Folder') {
            handleCreateFolder(nodeId, false);
        }
        if (action === 'New Sub Folder') {
            handleCreateFolder(nodeId, true);
        }
        if (action === 'New Job') {
            handleCreateJob(nodeId);
        }
        console.log(`Clicked on "${action}" for node with ID: ${nodeId}`);
        handleCloseContextMenu();
    };

    return (
        <div className="container mt-4 mb-5">
           <h5 className="p-3" style={{ backgroundColor: "#BBDEFB", borderRadius: "10px", color: "#212121" }}><strong>SideMenu</strong></h5>
           {hierarchy.length === 0 ? <Button marginY={8} marginRight={12} iconBefore={PlusIcon} onClick={handleCreateProject}>
                Add Your First Project
            </Button> : <></>}
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {hierarchy.map((node) => renderTree(node))}
            </TreeView>
            <Menu
                open={Boolean(contextMenuPosition)}
                onClose={handleCloseContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenuPosition
                        ? { top: contextMenuPosition.top, left: contextMenuPosition.left }
                        : undefined
                }
            >
                {contextMenuActions.map((action) => (
                    <MenuItem
                        key={action}
                        onClick={() => handleMenuItemClick(action, contextMenuPosition?.nodeId)}
                    >
                        {action}
                    </MenuItem>
                ))}
            </Menu>

        </div>
    );

}

export default SidebarComponent;