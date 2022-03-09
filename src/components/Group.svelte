<script>
    import { selectedRow } from '../stores/rows.store';
    import { getGroupRows, addGroupRow } from '../services/data.service';
    import { tableData } from '../stores/data.store';
    import { dataLoading } from '../stores/data.store'
    import Cell from './Cell.svelte';  
    import Row from './Row.svelte';

    export let groupData;

    let focused = false;

    let loaded;

    dataLoading.subscribe(d => {
        loaded = d;
    })

    selectedRow.subscribe(v => {
        if(v == groupData?.id) {
            focused = true;
        } else {
            focused = false;
        }
    });

    let uc = 1
    tableData.subscribe(d => {
    if(d) {
        uc = uc++
    }
   });

    let groupRows;
    async function setExpanded() {
        if(!groupData.rows.length) {
            groupRows = await getGroupRows({groupId: groupData.groupId, taskId: groupData.taskId});
        }
        
        groupData.isExpanded = !groupData.isExpanded;
    }

    async function addRow() {
         groupRows = await addGroupRow({groupId: groupData.groupId, taskId: groupData.taskId});
    }


</script>
<div class="ac-row" class:ac-row-focused={focused} on:click="{() => selectedRow.set(groupData?.groupId)}">
    <div class="ac-rownum-cell" on:click="{() => setExpanded()}">
        {#if groupData.isExpanded}
        <button class="ac-row-button" disabled="{loaded}">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 10.9192L15.0405 13.9596L15.9597 13.0404L12.0001 9.08074L8.04048 13.0404L8.95972 13.9596L12.0001 10.9192Z" fill="currentColor"></path>
            </svg> 
        </button>
        {:else}
        <button class="ac-row-button" disabled="{loaded}">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9595 10.9596L11.9999 14.9193L8.04028 10.9596L8.95952 10.0404L11.9999 13.0808L15.0403 10.0404L15.9595 10.9596Z" fill="currentColor"></path>
            </svg>
        </button>         
        {/if}
    </div>
    {#each groupData.fixedCells as cell}
        <Cell cellData={cell} rowId={groupData.id} cellStyles={'position: sticky; left:'+ cell.left +'px;'}/>
    {/each}
    {#each groupData.cells as cell}
        <Cell cellData={cell} rowId={groupData.id} />
    {/each}
</div>

{#if groupData.isExpanded}
    {#await groupRows then rows}
        {#each groupData.rows as row}
            <Row rowData={row} showRowNum={false}/>
        {/each}
        <div class="ac-add-row-btn" on:click="{() => addRow()}">+</div>
    {/await}
{/if}



<style>

    .ac-row-button {
        background: transparent;
        border: transparent;
    }

    .ac-row {
        display: flex;
        height: 50px;
    }

    .ac-add-row-btn {
        width: 40px;
        height: 50px;
        background-color: #e5e5e5;   
        display: flex;
        justify-content: center;
        font-weight: 600;
        font-size: 25px;
        align-items: center; 
        cursor: pointer;
    }    

    .ac-row-focused {
        box-sizing: border-box;
        border-bottom: 1px solid rgb(143, 143, 143);
        border-top: 1px solid rgb(143, 143, 143);
    }

    .ac-rownum-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #d7d7d7;
        box-sizing: border-box;
        border-bottom: 1px solid #d7d7d7;
        width: 40px;
        background-color: #e5e5e5;       
        position: sticky;
        cursor: pointer;
        left: 0;
    }

    .ac-table-row { 
        height: 50px;
        z-index: 1;
    }
</style>