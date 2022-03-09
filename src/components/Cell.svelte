<script>
    import { updateTableGroups } from '../helpers/updateTableGroups'
    import { dataLoading } from '../stores/data.store'

    export let cellData;
    export let rowId;
    export let groupId;
    export let cellStyles = '';

    let isEditing = false;
    let loaded;

    dataLoading.subscribe(d => {
        loaded = d;
    })

    function handleInput(event) {
        if(cellData.type === 'checkbox') {
            cellData.value = event.target.checked;
            return;
        }
		cellData.value = event.target.value;
        return;
	}

    function parseValue(value) {
        if(!value) {
            return '';
        }

        if(value === '0' && cellData.type === 'number' && cellData?.canEdit) {
            return '';
        }

        return value;
    }

    function formatNumber(value) {
        if(!value) {
            return '';
        }

        if((value === '0' || value === '0.0') && cellData?.canEdit) {
            return '';
        }

        if(value) {
            return parseFloat(value).toLocaleString();
        }
        return value;
    }
</script>

<div class="ac-cell {cellData.type === 'text' ? 'ac-cell-align-left' : ''}" style="width: {cellData.width}px; background-color: {cellData.background || '#fff'}; {cellStyles}">
    {#if cellData.type !== 'number' && cellData.type !== 'select'}
        <input
        title="{cellData?.tooltip || cellData.value}" 
        style="background-color: {cellData.background || '#fff'};" 
        type="{cellData.type || 'text'}" 
        disabled={cellData?.canEdit === 0 || !cellData?.canEdit || loaded}
        value={parseValue(cellData.value)}
        on:input="{handleInput}"
        on:keyup="{e => updateTableGroups(e.target.value, cellData.columnId, rowId, groupId)}"        
        >
    {/if}

    {#if cellData.type === 'select'}
        <select id="123" style="background-color: {cellData.background || '#fff'};" disabled={cellData?.canEdit === 0 || !cellData?.canEdit || loaded} on:change="{e => {updateTableGroups(e.target.value, cellData.columnId, rowId, groupId);}}">
            {#each cellData.options as option}
                <option value="{option.value}" selected={cellData.value === option.value}>{option.text}</option>
            {/each} 
        </select>
    {/if}

    {#if isEditing && cellData.type === 'number'}
        <input
        title="{cellData?.tooltip || cellData.value}" 
        style="background-color: {cellData.background || '#fff'};" 
        type="number" 
        disabled={cellData?.canEdit === 0 || !cellData?.canEdit || loaded}
        value={parseValue(cellData.value)}
        on:input="{handleInput}"
        on:blur="{() => isEditing = false}"
        on:keyup="{e => updateTableGroups(e.target.value, cellData.columnId, rowId, groupId)}"        
        >
    {/if}

    {#if !isEditing && cellData.type === 'number'}
        <input
        title="{cellData?.tooltip || cellData.value}" 
        style="background-color: {cellData.background || '#fff'};" 
        type="text" 
        disabled={cellData?.canEdit === 0 || !cellData?.canEdit || loaded}
        value={formatNumber(cellData.value)}
        on:focus="{() => isEditing = true}"
        >
    {/if}
</div> 


<style>
    .ac-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #d7d7d7;
        box-sizing: border-box;
        border-bottom: 1px solid #d7d7d7;
    }

    .ac-cell > input {
        color: #333;
        margin: 0 auto;
        padding: 5px;
        border-radius: 0.2rem;
        border: none;
        width: 90%;
        display: block;
        border-bottom: 0.3rem solid transparent;
        transition: all 0.3s;
        text-align: end;
        cursor: pointer;
    }

    .ac-cell > input::-webkit-outer-spin-button,
    .ac-cell > input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="date"][title=""]::-webkit-datetime-edit-year-field,
    input[type="date"][title=""]::-webkit-datetime-edit-month-field,
    input[type="date"][title=""]::-webkit-datetime-edit-day-field,
    input[type="date"][title=""]::-webkit-datetime-edit-text {
        color: transparent !important;
    }

    .ac-cell-align-left > input {
            text-align: start !important;      
    }
</style>