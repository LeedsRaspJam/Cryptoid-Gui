<script>
	import { connect, websocketMessages } from '../lib/websocket';
	import { getCpuUsage, cpuUsage } from '../lib/data';
	import { onMount } from 'svelte';
	let websocketMessage;
	onMount(() => {
		 connect('ws://127.0.0.1:8080');
		websocketMessage = websocketMessages;
	});
</script>

<body>
		<p>Websocket</p>
		<p>{$websocketMessage}</p>
		<button on:click={getCpuUsage}>Get CPU</button>
		<p>CPU count: {$cpuUsage?.cpuCount || 'N/A'}</p>
		<p>CPU usage: {$cpuUsage?.cpuUsage || 'N/A'}</p>
</body>
