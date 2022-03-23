<script>
    import { selectedRow } from '../stores/rows.store';
    import { removeGroupRow, setTableData, checkTableData } from '../services/data.service';
    import Cell from './Cell.svelte';

    export let rowData;
    export let groupId;
    export let taskId;
    export let showRowNum = true;

    let focused = false;

    // selectedRow.subscribe(v => {
    //     if(v == rowData?.id) {
    //         focused = true;
    //     } else {
    //         focused = false;
    //     }
    // });
    let showRemoveBtn = false;

    // groupRows = await removeGroupRow({groupId: groupData.groupId, taskId: groupData.taskId})
    async function removeRow() {
        // await removeGroupRow({groupId: groupId, taskId: taskId, rowId: rowData.rowId})
        await setTableData().then(async () => {
            await removeGroupRow({groupId: groupId, taskId: taskId, rowId: rowData.rowId}).then(() => {checkTableData()});

        })
    }

</script>

<div class="ac-row" 
    class:ac-row-focused={focused} 
    on:click="{() => selectedRow.set(rowData?.id)}" 
    on:mouseenter="{() => showRemoveBtn = true}"
    on:mouseleave="{() => showRemoveBtn = false}"
    >
    <div class="ac-rownum-cell">
        {#if (showRowNum && !showRemoveBtn) || (showRowNum && !rowData?.manually)}
            {rowData.rowId}
        {/if} 
        {#if showRemoveBtn && groupId && taskId && rowData.manually}
            <span style="cursor: pointer; font-size: 16px; font-weight: 600;" on:click="{() => removeRow()}">X</span>
        {/if}
    </div>   
    {#each rowData.fixedCells as cell}
        <Cell cellData={cell} rowId={rowData.id} cellStyles={'position: sticky; left:'+ cell.left +'px; z-index: 2;'}/>
    {/each}
    {#each rowData.cells as cell}
        <Cell cellData={cell} rowId={rowData.id} groupId={groupId} />
    {/each}
</div>

<style>
    .ac-row {
        display: flex;
        height: 50px;
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
        left: 0
    }
</style>