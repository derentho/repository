PERMISSIONS = --allow-read --allow-write


test:
	@deno test $(PERMISSIONS) --unstable

coverage:
	@deno test $(PERMISSIONS) --coverage --unstable

lint:
	@deno lint --unstable

format:
	@deno fmt --check --ignore=deps.ts,deps.test.ts
