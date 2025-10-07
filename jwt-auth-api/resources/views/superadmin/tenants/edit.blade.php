@extends('superadmin.layout')

@section('content')
<h2>Edit Tenant</h2>

<form method="POST" action="{{ route('superadmin.tenants.update', $tenant->id) }}">
    @csrf @method('PUT')
    <div class="mb-3">
        <label>Name</label>
        <input type="text" name="name" value="{{ $tenant->name }}" class="form-control" required>
    </div>

    <div class="mb-3">
        <label>Domain</label>
        <input type="text" name="domain" value="{{ $tenant->domain }}" class="form-control" required>
    </div>

    <div class="mb-3">
        <label>Admin Email</label>
        <input type="email" name="admin_email" value="{{ $tenant->admin_email }}" class="form-control" required>
    </div>

    <button class="btn btn-primary">Update Tenant</button>
</form>
@endsection
