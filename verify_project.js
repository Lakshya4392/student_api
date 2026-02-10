const assert = require('assert');

const BASE_URL = 'http://localhost:3000';

const runTests = async () => {
    console.log("🚀 Starting Verification Tests...");
    let passed = 0;
    let failed = 0;

    const test = async (name, fn) => {
        try {
            await fn();
            console.log(`✅ [PASS] ${name}`);
            passed++;
        } catch (error) {
            console.error(`❌ [FAIL] ${name}`);
            console.error(`   Error: ${error.message}`);
            failed++;
        }
    };

    // 1. GET /health
    await test('GET /health should return 200 and strict JSON', async () => {
        const response = await fetch(`${BASE_URL}/health`);
        const data = await response.json();

        assert.strictEqual(response.status, 200, "Status should be 200");
        assert.strictEqual(data.is_success, true, "is_success should be true");
        assert.ok(data.official_email, "official_email should be present");
    });

    // 2. POST /bfhl - Fibonacci
    await test('POST /bfhl - Fibonacci Logic', async () => {
        const response = await fetch(`${BASE_URL}/bfhl`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fibonacci: 7 })
        });
        const data = await response.json();
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(data.data, [0, 1, 1, 2, 3, 5, 8]);
    });

    // 3. POST /bfhl - Prime
    await test('POST /bfhl - Prime Logic', async () => {
        const response = await fetch(`${BASE_URL}/bfhl`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prime: [2, 4, 7, 9, 11] })
        });
        const data = await response.json();
        assert.deepStrictEqual(data.data, [2, 7, 11]);
    });

    // 4. POST /bfhl - AI Logic (Graceful Fallback/Check)
    await test('POST /bfhl - AI Logic Check', async () => {
        const response = await fetch(`${BASE_URL}/bfhl`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ AI: "Is the sky blue?" })
        });
        const data = await response.json();
        // We expect either success or a graceful error.
        assert.ok(data.hasOwnProperty('is_success'));
        if (data.is_success) {
            console.log(`   AI Result: ${data.data}`);
        } else {
            console.log(`   AI Error: ${data.error}`);
        }
    });

    console.log(`\n🎉 Summary: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) process.exit(1);
};

runTests();
