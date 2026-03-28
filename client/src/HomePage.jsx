import { useMemo, useState } from "react";
import axios from "axios";
import React from "react";
import { API_URL, API_KEY } from "./config";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Table,
  Alert,
  Spinner,
  Card,
  Badge,
  Stack,
} from "react-bootstrap";

const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1/user`,
  headers: {
    "x-api-key": API_KEY,
  },
});

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [editRows, setEditRows] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const editedCount = Object.keys(editRows).length;

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError("");
    setSuccess("");
    setHasSearched(true);

    try {
      const response = await apiClient.get("", {
        params: { q: search.trim() },
      });

      setUsers(response.data.metadata || []);
      setEditRows({});
    } catch (err) {
      setUsers([]);
      setError("Không tìm thấy dữ liệu hoặc không thể kết nối tới server.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!search.trim()) return;
    await handleSearch();
  };

  const handleClearSearch = () => {
    setSearch("");
    setUsers([]);
    setEditRows({});
    setError("");
    setSuccess("");
    setHasSearched(false);
  };

  const handleEditChange = (id, field, value) => {
    const originalUser = users.find((u) => String(u.id) === String(id));
    if (!originalUser) return;

    const originalValue =
      field === "birthdate"
        ? originalUser.birthdate
          ? new Date(originalUser.birthdate).toISOString().split("T")[0]
          : ""
        : (originalUser[field] ?? "");

    setEditRows((prev) => {
      const nextRow = {
        ...(prev[id] || {}),
        [field]: value,
      };

      if (value === originalValue) {
        delete nextRow[field];
      }

      const next = { ...prev };

      if (Object.keys(nextRow).length === 0) {
        delete next[id];
      } else {
        next[id] = nextRow;
      }

      return next;
    });
  };

  const handleResetChanges = () => {
    setEditRows({});
    setSuccess("");
    setError("");
  };

  const handleUpdate = async () => {
    if (editedCount === 0) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatePayload = Object.entries(editRows).map(([id, changes]) => ({
        id,
        ...changes,
      }));

      await apiClient.post("/bulk-update", {
        users: updatePayload,
      });

      setSuccess(`Đã cập nhật thành công ${updatePayload.length} user.`);
      setEditRows({});
      await handleSearch();
    } catch (err) {
      setError("Lỗi khi cập nhật dữ liệu. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const resultText = useMemo(() => {
    if (!hasSearched)
      return "Nhập từ khóa để tìm user theo username hoặc email.";
    if (loading) return "Đang tìm kiếm dữ liệu...";
    if (users.length === 0)
      return `Không tìm thấy user nào với từ khóa "${search}".`;
    return `Tìm thấy ${users.length} user phù hợp.`;
  }, [hasSearched, loading, users.length, search]);

  return (
    <Container fluid className="py-4 px-3 px-md-4 bg-light min-vh-100">
      <Row className="justify-content-center">
        <Col xl={10}>
          <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              {/* Header */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                  <h2 className="mb-1 fw-bold text-dark">Quản lý User</h2>
                  <div className="text-muted">
                    Tra cứu, chỉnh sửa và cập nhật hàng loạt thông tin người
                    dùng.
                  </div>
                </div>

                <Stack direction="horizontal" gap={2}>
                  <Badge bg="primary" pill className="fs-6 px-3 py-2">
                    {users.length} kết quả
                  </Badge>
                  {editedCount > 0 && (
                    <Badge
                      bg="warning"
                      text="dark"
                      pill
                      className="fs-6 px-3 py-2"
                    >
                      {editedCount} dòng đã sửa
                    </Badge>
                  )}
                </Stack>
              </div>

              {/* Search */}
              <Card className="border-0 bg-body-tertiary rounded-4 mb-4">
                <Card.Body className="p-3 p-md-4">
                  <Row className="g-3 align-items-end">
                    <Col lg={8}>
                      <Form.Label className="fw-semibold">
                        Tìm theo username hoặc email
                      </Form.Label>
                      <InputGroup size="lg">
                        <Form.Control
                          placeholder="Ví dụ: phong, ..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        {search && (
                          <Button
                            variant="outline-secondary"
                            onClick={handleClearSearch}
                            disabled={loading || saving}
                          >
                            Xóa
                          </Button>
                        )}
                        <Button
                          variant="primary"
                          onClick={handleSearch}
                          disabled={loading || saving || !search.trim()}
                        >
                          {loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />{" "}
                              Đang tìm...
                            </>
                          ) : (
                            "Tìm kiếm"
                          )}
                        </Button>
                      </InputGroup>
                    </Col>

                    <Col lg={4}>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          className="w-100"
                          onClick={handleRefresh}
                          disabled={loading || saving || !search.trim()}
                        >
                          Refresh kết quả
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="w-100"
                          onClick={handleResetChanges}
                          disabled={loading || saving || editedCount === 0}
                        >
                          Bỏ thay đổi
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-3 text-muted small">{resultText}</div>
                </Card.Body>
              </Card>

              {/* Alerts */}
              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setError("")}
                  className="rounded-3"
                >
                  {error}
                </Alert>
              )}

              {success && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setSuccess("")}
                  className="rounded-3"
                >
                  {success}
                </Alert>
              )}

              {/* Table / Empty state */}
              {users.length > 0 ? (
                <>
                  <div className="table-responsive rounded-4 border bg-white">
                    <Table hover className="align-middle mb-0">
                      <thead>
                        <tr className="table-light">
                          <th className="py-3 px-3">Username</th>
                          <th className="py-3 px-3">Email</th>
                          <th className="py-3 px-3">Ngày sinh</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => {
                          const isEdited = !!editRows[user.id];

                          return (
                            <tr
                              key={user.id}
                              className={isEdited ? "table-warning" : ""}
                            >
                              <td className="px-3 py-3">
                                <Form.Control
                                  size="sm"
                                  value={
                                    editRows[user.id]?.username ??
                                    user.username ??
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleEditChange(
                                      user.id,
                                      "username",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Username"
                                />
                              </td>

                              <td className="px-3 py-3">
                                <Form.Control
                                  size="sm"
                                  type="email"
                                  value={
                                    editRows[user.id]?.email ?? user.email ?? ""
                                  }
                                  onChange={(e) =>
                                    handleEditChange(
                                      user.id,
                                      "email",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Email"
                                />
                              </td>

                              <td className="px-3 py-3">
                                <Form.Control
                                  size="sm"
                                  type="date"
                                  value={
                                    editRows[user.id]?.birthdate ??
                                    (user.birthdate
                                      ? new Date(user.birthdate)
                                          .toISOString()
                                          .split("T")[0]
                                      : "")
                                  }
                                  onChange={(e) =>
                                    handleEditChange(
                                      user.id,
                                      "birthdate",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>

                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-4">
                    <div className="text-muted small">
                      {editedCount > 0
                        ? `Bạn đang có ${editedCount} dòng chưa được lưu.`
                        : "Chưa có thay đổi nào."}
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-secondary"
                        onClick={handleResetChanges}
                        disabled={saving || loading || editedCount === 0}
                      >
                        Hoàn tác
                      </Button>

                      <Button
                        variant="success"
                        size="lg"
                        onClick={handleUpdate}
                        disabled={loading || saving || editedCount === 0}
                      >
                        {saving ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Đang cập nhật...
                          </>
                        ) : (
                          `Lưu thay đổi${editedCount > 0 ? ` (${editedCount})` : ""}`
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                hasSearched &&
                !loading && (
                  <Card className="border-0 bg-body-tertiary rounded-4">
                    <Card.Body className="text-center py-5">
                      <div className="fs-5 fw-semibold mb-2">
                        Không có dữ liệu
                      </div>
                      <div className="text-muted">
                        Không tìm thấy user nào khớp với từ khóa{" "}
                        <strong>"{search}"</strong>.
                      </div>
                    </Card.Body>
                  </Card>
                )
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
