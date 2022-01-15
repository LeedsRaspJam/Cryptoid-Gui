<script lang="ts">
	import { connect, websocketMessages } from '../lib/websocket';
	import { getCpuUsage, cpuUsage } from '../lib/data';
	import { browser } from '$app/env';
	import { logStore } from '../lib/log';
	import { onMount } from 'svelte';
	import { toggleDebug } from '../lib/log';
	import { toasts, ToastContainer, FlatToast, BootstrapToast } from 'svelte-toasts';
	let debug = false
	function toggleDebuggy() {
		toggleDebug()
		// @ts-expect-error
		document.getElementById('debugToggle').checked = !debug
		debug = !debug
	}
	let websocketMessage;
	if (browser) {
		connect('ws://127.0.0.1:8080');
		websocketMessage = websocketMessages;
	}
	onMount(() => {
		logStore.subscribe((value: any) => {
			if (value) {
				toasts.add({
					title: value.level,
					description: value.message,
					duration: value.level == 'ERROR' || value.level == 'WARN' ? 5000 : 2000,
					placement: 'bottom-right',
					// @ts-expect-error
					type: String(value.level).toLowerCase(),
					theme: 'dark',
					showProgress: true
				});
			}
		});
	});
</script>

<body>
	<div class="container"><br />
		<div class="form-check form-switch" style="float: right;">
		<input
			class="form-check-input"
			type="checkbox"
			role="switch"
			id="debugToggle"
			on:click={toggleDebuggy}
		/>
		<label class="form-check-label" for="flexSwitchCheckChecked">Debug {debug ? 'on' : 'off'}</label>
	</div>
		<p>Websocket</p>
		<p>{$websocketMessage}</p>
		<button on:click={getCpuUsage}>Get CPU</button>
		<p>CPU count: {$cpuUsage?.cpuCount || 'N/A'}</p>
		<p>CPU usage: {$cpuUsage?.cpuUsage || 'N/A'}</p>
		<ToastContainer placement="bottom-right" let:data>
			<FlatToast {data} />
		</ToastContainer>
	</div>
</body>
